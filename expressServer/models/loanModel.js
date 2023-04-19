const db = require('../config/db');

class Loan {
  constructor(loanId, userId, startDate, dueDate, deviceId, exten, returnDate) {
    this.loanId = loanId;
    this.userId = userId;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.deviceId = deviceId;
    this.exten = exten;
    this.returnDate = returnDate;
  }

  //for AdminScheduleScreen.js (loads devices reserved & overdue/due this week) ****TODO****
  static async getSchedule() {
    let sql = `SELECT loan.*, device.name 
               FROM loan
               INNER JOIN device ON loan.deviceId = device.deviceId
               WHERE WEEKOFYEAR(loan.startDate) = WEEKOFYEAR(CURDATE())`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // for AdminScheduleScreen.js (loads devices reserved this week and due by the end of this week)
  static async getSchedule() {
    let sql = `SELECT *
               FROM loan
               WHERE (state = 'reserved' OR state = 'loaned')
               AND WEEK(reservationDate) = WEEK(NOW())
               AND YEAR(reservationDate) = YEAR(NOW())
               AND WEEK(dueDate) = WEEK(NOW())
               AND YEAR(dueDate) = YEAR(NOW())`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Misc
  static async getAllLoans() {
    let sql = 'SELECT * FROM loan';
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Misc
  static async getLoanById(loanId) {
    let sql = 'SELECT * FROM loan WHERE loanId = ?';
    const [rows] = await db.execute(sql, [loanId]);
    return rows[0];
  }

  // for GeneralDeviceAdmin.js (given name of a device, find all associated loan history)
  static async getLoanHistoryByName(name) {
    let sql = `SELECT 
               l.loanId, l.userId, l.startDate, l.dueDate, l.deviceId, l.exten, l.returnDate, d.name
               FROM loan l
               JOIN device d ON l.deviceId = d.deviceId
               WHERE d.name = ?`;
    const [rows] = await db.execute(sql, [name]);
    return rows;
  }

  // for PastDeviceScreen.js (returns all loan history for a specific user)
  static async getLoanHistoryByUser(userId) {
    let sql = 'SELECT * FROM loan WHERE userId = ?';
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }  

  // for UserAppointmentScreen.js (selects loans where the state is reserved and userID is userId)
  static async getReservedByUser(userId) {
    let sql = `SELECT *
               FROM loan
               WHERE userId = ? AND state = 'Reserved'`;
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }

  // for UserLoansScreen.js (returns all current loans for a specific user)
  static async getCurrentLoans(userId) {
    let sql = `SELECT *
               FROM loan
               WHERE userId = ? AND state = 'Loaned'`;
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }

  // for GeneralDeviceExtendScreen.js (extend specific device by its ID)
  static async extendLoanById(deviceId, userId) {
    let sql = `UPDATE loan l
               JOIN (
                SELECT MAX(loanId) AS latestLoanId
                FROM loan
                WHERE deviceId = ? AND userId = ? AND exten = 0
                GROUP BY deviceId
                ) latest ON l.loanId = latest.latestLoanId
                JOIN rule r ON l.ruleId = r.ruleId
                SET l.dueDate = DATE_ADD(l.dueDate, INTERVAL r.ruleDur DAY),l.exten = 1`;
  const [result] = await db.execute(sql, [deviceId, userId]);
  return result.affectedRows;
}

/*
  // Helper function to get the current week's date for the given day of the week
  function getCurrentWeekDate(day) {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const daysUntilDesiredDay = day - currentDayOfWeek;
    const desiredDate = new Date(currentDate);
    desiredDate.setDate(desiredDate.getDate() + daysUntilDesiredDay);
    return desiredDate;
  }

  // 8
  static async getLoanHistory() {
    let sql = `SELECT loan.deviceId as deviceID, loan.userId as userID, loan.startDate as date
             FROM loan
             ORDER BY loan.startDate DESC`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // 4
  static async getLoansWithDeviceNamesForCurrentWeek() {
    let sql = `SELECT l.*, d.name
             FROM loan l
             JOIN device d ON l.deviceId = d.deviceId
             WHERE YEARWEEK(startDate, 1) = YEARWEEK(NOW(), 1)`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // 5
  static async getLoansByDeviceId(deviceId) {
    let sql = 'SELECT * FROM loan WHERE deviceId = ?';
    const [rows] = await db.execute(sql, [deviceId]);
    return rows;
  }

  // 13
  static async createReservation(userId, deviceId, scheduledCollectionDate) {
    let startDate = new Date();
    let dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + 14); // You can adjust the duration based on your needs
    let exten = 0;
    let scheduledReturnDate = new Date(dueDate);
    return this.createLoan(userId, startDate, dueDate, deviceId, exten, scheduledCollectionDate, scheduledReturnDate);
  }

  // 14
  static async createReservation(userId, deviceId, scheduledCollectionDate) {
    const startDate = getCurrentWeekDate(scheduledCollectionDate);
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + 14); // You can adjust the duration based on your needs
    const exten = 0;
    const scheduledReturnDate = new Date(dueDate);
    return this.createLoan(userId, startDate, dueDate, deviceId, exten, scheduledCollectionDate, scheduledReturnDate);
  }

  // 11
  static async extendLoanDueDate(connection, loanId, newDueDate) {
    const query = `UPDATE loans
    SET due_date = ?
    WHERE id = ?;`;
    const [result] = await connection.query(mysql.format(query, [newDueDate, loanId]));
    return result.affectedRows > 0;
  }

  static async createLoan(userId, startDate, dueDate, deviceId, exten, returnDate) {
    let sql = `INSERT INTO loan (userId, startDate, dueDate, deviceId, exten, returnDate)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [userId, startDate, dueDate, deviceId, exten, returnDate]);
    return new Loan(result.insertId, userId, startDate, dueDate, deviceId, exten, returnDate);
  }

  static async updateLoan(loanId, data) {
    let sql = 'UPDATE loan SET ? WHERE loanId = ?';
    const [result] = await db.execute(sql, [data, loanId]);
    return result.affectedRows > 0;
  }

  static async deleteLoan(loanId) {
    let sql = 'DELETE FROM loan WHERE loanId = ?';
    const [result] = await db.execute(sql, [loanId]);
    return result.affectedRows > 0;
  }

  // 16
  static async getLoansByStatus(userId, status) {
    let sql = `SELECT l.loanId, l.startDate as borrowDate, l.dueDate, d.name as device
             FROM loan l
             JOIN device d ON l.deviceId = d.deviceId
             WHERE l.userId = ? AND (l.dueDate >= NOW()) = ?`;
    const [rows] = await db.execute(sql, [userId, status]);
    return rows;
  }
*/
}

module.exports = Loan;