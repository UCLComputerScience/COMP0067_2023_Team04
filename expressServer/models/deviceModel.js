const db = require('../config/db');

class Device {
  constructor(deviceId, status, details, category, name, ruleExt, ruleDur, qrCode, storage, launchYr, cost) {
    this.deviceId = deviceId;
    this.status = status;
    this.details = details;
    this.category = category;
    this.name = name;
    this.ruleExt = ruleExt;
    this.ruleDur = ruleDur;
    this.qrCode = qrCode;
    this.storage = storage;
    this.launchYr = launchYr;
    this.cost = cost;
  }

  static async getAllDevices() {
    let sql = 'SELECT * FROM device';
    const [rows] = await db.execute(sql);
    return rows;
  }

  //for DetailDeviceAdmin.js, specific device by ID and details and latest loan
  static async getDeviceById(deviceId) {
    let sql = 'SELECT * FROM device WHERE deviceId = ?';
    const [rows] = await db.execute(sql, [deviceId]);
    return rows[0];
  }

  //for AdminDevicesScreen.js (gets deviceName, num_loaned, num_available, category)
  // write getDevicesByNameAvailability() here

  // for UserDevicesScreen.js (gets deviceName, launchedYear, num_available, category)
  // write getDevicesByNameAvailabilityUser() here

  static async getDeviceSummary() {
    let sql = `
      SELECT
        d.name,
        SUM(CASE WHEN d.status = 'Available' THEN 1 ELSE 0 END) AS available_count,
        SUM(CASE WHEN d.status = 'Reserved' THEN 1 ELSE 0 END) AS reserved_count,
        SUM(CASE WHEN l.deviceId IS NOT NULL THEN 1 ELSE 0 END) AS on_loan_count
      FROM device d
      LEFT JOIN loan l ON d.deviceId = l.deviceId AND l.dueDate >= NOW()
      GROUP BY d.name
    `;

    const [rows] = await db.execute(sql);
    return rows;
  }

  // for GeneralDeviceAdmin.js (given name of device, find its details)
  // write getDetailsByDeviceName(deviceName) here

  // for GeneralDeviceAdmin.js (given name of device, get all device IDs and associated states)
  // write getIdByName(deviceName) here

  // for GeneralDeviceUser.js (given name of device, returns details of first available device specified by ID)
  // write getDevicebyName(deviceName) here

  // Undefined route
  static async updateDeviceState(deviceId, newState) {
    let sql = 'UPDATE device SET status = ? WHERE deviceId = ?';
    const [result] = await db.execute(sql, [newState, deviceId]);
    return result.affectedRows > 0;
  }

/*  
  // More methods

  // 15
  static async getAllDevicesUser() {
    let sql = 'SELECT name, launchedyear, available FROM devices'; // Assuming the table name is 'devices'
    const [rows] = await db.execute(sql);
    return rows;
  }

*/
}

module.exports = Device;