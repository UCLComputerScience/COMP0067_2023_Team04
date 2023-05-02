const db = require('../config/db');

class Device {
  constructor(deviceId, status, details, category, name, ruleExt, ruleDur, storage, launchYr, cost) {
    this.deviceId = deviceId;
    this.status = status;
    this.details = details;
    this.category = category;
    this.name = name;
    this.ruleExt = ruleExt;
    this.ruleDur = ruleDur;
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

  // for UserDevicesScreen.js (gets name, launchYr, num_available, category)
  static async getDevicesByNameAvailabilityUser() {
    const [rows] = await db.execute(`
      SELECT 
        name, 
        launchYr, 
        COUNT(CASE WHEN state = 'Available' THEN 1 END) AS num_available, 
        category 
      FROM device 
      GROUP BY name, launchYr, category`);
    return rows;
  }

  static async getDeviceSummary() {
    let sql = `
      SELECT
        d.name,
        SUM(CASE WHEN d.state = 'Available' THEN 1 ELSE 0 END) AS available_count,
        SUM(CASE WHEN d.state = 'Reserved' THEN 1 ELSE 0 END) AS reserved_count,
        SUM(CASE WHEN l.deviceId IS NOT NULL AND d.state = 'Loaned' THEN 1 ELSE 0 END) AS on_loan_count
      FROM device d
      LEFT JOIN loan l ON d.deviceId = l.deviceId AND l.returnDate IS NULL
      GROUP BY d.name
    `;
  
    const [rows] = await db.execute(sql);
    return rows;
  }
  
  // for GeneralDeviceAdmin.js (given name of device, find its details, the first row found - or any row for that matter - will do)
  static async getDetailsByDeviceName(name) {
    const [rows] = await db.execute('SELECT * FROM `device` WHERE `name` = ? LIMIT 1', [name]);
    return rows[0];
  }

  // for GeneralDeviceAdmin.js (given name of device, get all device IDs and associated states)
  static async getIdByName(name) {
    const [rows] = await db.execute('SELECT `deviceId`, `state` FROM `device` WHERE `name` = ?', [name]);
    return rows;
  }

  // for GeneralDeviceUser.js (given name of device, returns details of first available device specified by ID)
  static async getDevicebyName(name) {
    const [rows] = await db.execute('SELECT * FROM `device` WHERE `name` = ? AND `state` = "Available" LIMIT 1', [name]);
    return rows[0];
  }

  // updates state of the device based on JSON object //for returning, borrowing devices, changing device state to maintanence or scrapped
  static async updateDeviceState(deviceId, newState) {
    let sql = 'UPDATE device SET state = ? WHERE deviceId = ?';
    const [result] = await db.execute(sql, [newState, deviceId]);
    return result.affectedRows > 0;
  }

  // inserts database entry based on JSON object
  static async addDevice(device) {
    const sql = `INSERT INTO device 
                (deviceId, registerDate, state, details, category, name, ruleExt, ruleDur, storage, launchYr, cost, issues) 
                VALUES (?, CURRENT_DATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      device.deviceId, 
      device.state, 
      device.details, 
      device.category, 
      device.name, 
      device.ruleExt, 
      device.ruleDur, 
      device.storage, 
      device.launchYr, 
      device.cost, 
      device.issues
    ];
    const [result] = await db.query(sql, values);
    if(result.affectedRows > 0) {
      return device.deviceId; //returns UUID for device
    }
    return null;
  }

  // used for createLoan in loanModel.js
  static async isDeviceAvailable(deviceId) {
    const sql = 'SELECT state FROM device WHERE deviceId = ?';
    const [rows] = await db.execute(sql, [deviceId]);

    if (rows.length > 0) {
      return rows[0].state === 'Available';
    }
    return false;
  }

  // checks if a device is available
  static async isDeviceAvailable(deviceId) {
    const sql = 'SELECT state FROM device WHERE deviceId = ?';
    const [rows] = await db.execute(sql, [deviceId]);

    if (rows.length > 0) {
      return rows[0].state === 'Available';
    }
    return false;
  }

  // for cancel reservation: cancel reservation for a specific device
  static async cancelReservation(deviceId) {
    const sql = 'UPDATE device SET state = ? WHERE deviceId = ?';
    const [result] = await db.execute(sql, ['Available', deviceId]);
    return result.affectedRows > 0;
  }

}

module.exports = Device;