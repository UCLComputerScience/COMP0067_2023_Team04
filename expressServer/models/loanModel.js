const db = require('../config/db');

class Loan {
  constructor(loanId, userId, userEmail, startDate, dueDate, deviceId, exten, returnDate) {
    this.loanId = loanId;
    this.userId = userId;
    this.userEmail = userEmail;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.deviceId = deviceId;
    this.exten = exten;
  }

  //for AdminScheduleScreen.js (loads devices reserved & overdue/due this week) ****TODO****
  static async getSchedule() {
    const sql = `
    SELECT loan.loanId, loan.userId, loan.userEmail, loan.startDate, loan.dueDate, 
    loan.deviceId, loan.exten, loan.returnedDate, device.state
    FROM loan
    INNER JOIN device ON loan.deviceId = device.deviceId
    WHERE (WEEK(loan.startDate) = WEEK(CURRENT_DATE) AND YEAR(loan.startDate) = YEAR(CURRENT_DATE)) OR
    ((loan.dueDate <= CURRENT_DATE + INTERVAL (7 - DAYOFWEEK(CURRENT_DATE)) DAY) AND loan.returnedDate IS NULL)
    ORDER BY loan.startDate;
    `;
  
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
               l.loanId, l.userId, l.startDate, l.dueDate, l.deviceId, l.exten, d.name
               FROM loan l
               JOIN device d ON l.deviceId = d.deviceId
               WHERE d.name = ?`;
    const [rows] = await db.execute(sql, [name]);
    return rows;
  }

  // returns information on the latest loan (NOT reservation) of a device give device ID
  static async getLatestLoan(deviceId) {
    let sql = `SELECT * FROM loan WHERE deviceId = ? AND startDate IS NOT NULL AND dueDate IS NOT NULL 
               ORDER BY loanId DESC LIMIT 1`;
    const [rows] = await db.execute(sql, [deviceId]);
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
              INNER JOIN device ON loan.deviceId = device.deviceId
              WHERE loan.userId = ? AND device.state = 'Reserved'`;
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }

  // for UserLoansScreen.js (returns all current loans for a specific user)
  static async getCurrentLoans(userId) {
    let sql = `SELECT *
              FROM loan
              INNER JOIN device ON loan.deviceId = device.deviceId
              WHERE loan.userId = ? AND device.state = 'Loaned'`;
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

  // Create a new loan
  static async createLoan(loan) {
    const sql = 'INSERT INTO loan (userId, userEmail, deviceId, startDate) VALUES (?, ?, ?, CURRENT_DATE())';
    const [result] = await db.execute(sql, [loan.userId, loan.userEmail, loan.deviceId]);

    if (result.affectedRows > 0) {
      return result.insertId;
    } else {
      throw new Error(`Could not create loan for device with ID ${loan.deviceId}.`);
    }
  }

  // Cancel Reservations
  // for cancel reservation: get deviceId for a specific loan
  static async getDeviceIdByLoan(loanId) {
    const sql = 'SELECT deviceId FROM loan WHERE loanId = ?';
    const [rows] = await db.execute(sql, [loanId]);
    return rows.length ? rows[0].deviceId : null;
  }

  // for cancel reservation's userId check
  static async getUserIdByLoan(loanId) {
    const sql = 'SELECT userId FROM loan WHERE loanId = ?';
    const [rows] = await db.execute(sql, [loanId]);
    return rows.length ? rows[0].userId : null;
  }
  
  // for cancel reservation: remove a loan by its ID 
  static async removeLoan(loanId) {
    const sql = 'DELETE FROM loan WHERE loanId = ?';
    const [result] = await db.execute(sql, [loanId]);
    return result.affectedRows > 0;
  }

  // Renew Loans
  // Get the number of remaining renewals
  static async getRemainingRenewals(loanId) {
    const sql = 'SELECT device.ruleExt, loan.exten FROM loan INNER JOIN device ON loan.deviceId = device.deviceId WHERE loan.loanId = ?';
    const [rows] = await db.execute(sql, [loanId]);
    if (rows.length > 0) {
      const { ruleExt, exten } = rows[0];
      return ruleExt - exten;
    }
    return null;
  }

  // renew a loan
  static async renewLoan(loanId) {
    const remainingRenewals = await this.getRemainingRenewals(loanId);
    if (remainingRenewals > 0) {
      const sql = 'UPDATE loan INNER JOIN device ON loan.deviceId = device.deviceId SET loan.dueDate = DATE_ADD(loan.dueDate, INTERVAL device.ruleDur DAY), loan.exten = loan.exten + 1 WHERE loan.loanId = ?';
      const [result] = await db.execute(sql, [loanId]);
      return result.affectedRows > 0;
    }
    return false;
  }

  // Loan is marked complete after the device is returned.
  static async completeLoan(deviceId) {
    const sql = 'UPDATE loan SET returnedDate = CURRENT_DATE() WHERE deviceId = ? AND returnedDate IS NULL';
    const [result] = await db.execute(sql, [deviceId]);
    return result.affectedRows > 0;
  }
}

module.exports = Loan;