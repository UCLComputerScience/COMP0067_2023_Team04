const db = require('../config/db');

class Loan {
  constructor(loanId, userId, startDate, dueDate, deviceId, exten, returnDate) {
    this.loanId = loanId;
    this.userId = userId;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.deviceId = deviceId;
    this.exten = exten;
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
              INNER JOIN device ON loan.deviceId = device.deviceId
              WHERE (device.state = 'Reserved' OR device.state = 'Loaned')
              AND WEEK(loan.startDate) = WEEK(NOW())
              AND YEAR(loan.startDate) = YEAR(NOW())
              AND WEEK(loan.dueDate) = WEEK(NOW())
              AND YEAR(loan.dueDate) = YEAR(NOW())`;
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

}

module.exports = Loan;