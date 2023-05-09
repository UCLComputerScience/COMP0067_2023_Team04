const deviceModel = require('../models/deviceModel');
const loanModel = require('../models/loanModel');
const statsModel = require('../models/statsModel');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

exports.getAllDevices = async (req, res, next) => {
  try {
    const devices = await deviceModel.getAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices', error });
  }
};

//for DetailDeviceAdmin.js, specific device by ID and details and latest loan
exports.getDeviceById = async (req, res, next) => {
  try {
    const device = await deviceModel.getDeviceById(req.params.id);
    if (device) {
      res.status(200).json(device);
    } else {
      res.status(404).json({ message: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device', error });
  }
};

//for AdminDevicesScreen.js (gets name, num_loaned, num_available, category)
exports.getDevicesByNameAvailability = async (req, res, next) => {
  try {
    const devices = await deviceModel.getDevicesByNameAvailability();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices by name and availability', error });
  }
};

// for UserDevicesScreen.js (gets name, launchedYear, num_available, category)
exports.getDevicesByNameAvailabilityUser = async (req, res, next) => {
  try {
    const devices = await deviceModel.getDevicesByNameAvailabilityUser();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices for user by name and availability', error });
  }
};

// for GeneralDeviceAdmin.js (given name of device, find its details)
exports.getDetailsByDeviceName = async (req, res, next) => {
  try {
    const deviceName = req.params.name;
    const device = await deviceModel.getDetailsByDeviceName(deviceName);
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device details', error });
  }
};

// for GeneralDeviceAdmin.js (given name of device, get all device IDs and associated states)
exports.getIdByName = async (req, res, next) => {
  try {
    const deviceName = req.params.name;
    const devices = await deviceModel.getIdByName(deviceName);
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device IDs', error });
  }
};

// for GeneralDeviceUser.js (returns details of first available device by its name)
exports.getDevicebyName = async (req, res, next) => {
  try {
    const deviceName = req.params.name;
    const device = await deviceModel.getDevicebyName(deviceName);

    if (!device) {
      res.status(200).json({ deviceId: null });
    } else {
      res.status(200).json(device);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device by name', error });
  }
};

//for AdminScheduleScreen.js (loads devices reserved & overdue/due this week)
exports.getSchedule = async (req, res, next) => {
  try {
    const schedule = await loanModel.getSchedule();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error });
  }
};

// Misc
exports.getAllLoans = async (req, res, next) => {
  try {
    const loans = await loanModel.getAllLoans();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error });
  }
};

// Misc
exports.getLoanById = async (req, res, next) => {
  try {
    const loan = await loanModel.getLoanById(req.params.id);
    if (loan) {
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan', error });
  }
};

// for GeneralDeviceAdmin.js (given name of a device, find all associated loan history)
exports.getLoanHistoryByName = async (req, res, next) => {
  try {
    const deviceName = req.params.name;
    const loanHistory = await loanModel.getLoanHistoryByName(deviceName);
    res.status(200).json(loanHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan history', error });
  }
};

// returns information on the latest loan (NOT reservation) of a device give device ID
exports.getLatestLoan = async (req, res, next) => {
  try {
    const deviceId = req.params.deviceId;
    const loanInfo = await loanModel.getLatestLoan(deviceId);
    res.status(200).json(loanInfo[0]);
  } catch (error) {
    console.error("Error:", error); // Add this line to log the error to the console
    res.status(500).json({message: 'Error getting information on latest loan for the given device.', error})
  }
};

// for PastDeviceScreen.js (returns all loan history for a specific user)
exports.getLoanHistoryByUser = async (req, res, next) => {
  try {
    const userId = req.authData.upi;
    const loanHistory = await loanModel.getLoanHistoryByUser(userId);
    res.status(200).json(loanHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan history by user', error });
  }
};

// for UserAppointmentScreen.js (selects loans where the state is reserved and userID is userID)
exports.getReservedByUser = async (req, res, next) => {
  try {
    const userId = req.authData.upi;
    const reservedDevices = await loanModel.getReservedByUser(userId);
    res.status(200).json(reservedDevices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reserved devices by user', error });
  }
};

// for UserLoansScreen.js (returns all current loans for a specific user)
exports.getCurrentLoans = async (req, res, next) => {
  try {
    const userId = req.authData.upi;
    const currentLoans = await loanModel.getCurrentLoans(userId);
    res.status(200).json(currentLoans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current loans by user', error });
  }
};

//gets device information by a specific loan ID
exports.getDeviceByLoan = async (req, res, next) => {
  try {
    const loanId = req.params.loanId;
    const userId = req.authData.upi;
    console.log(loanId, userId)
    const device = await deviceModel.getDeviceByLoan(loanId, userId);

    if (!device) {
      res.status(200).json({ deviceId: null });
    } else {
      res.status(200).json(device);
    }
  } catch (error) {
    res.status(500).json({message: 'Error getting device information by a specific loan ID', error: error.message})
  }
};

// updates device state to state specified in JSON object
exports.updateDeviceState = async (req, res) => {
  let newState = req.body.state;
  let deviceId = req.params.id;

  // Validate the state
  const validStates = ['Available', 'Reserved', 'Loaned', 'Maintenance', 'Scrapped'];
  if (!validStates.includes(newState)) {
      return res.status(400).json({ error: 'Invalid state' });
  }

  try {
    const result = await deviceModel.updateState(deviceId, newState);
    if (result) {
      res.json({ message: 'Device state updated...', deviceId, newState });
    } else {
      res.status(500).json({ error: 'An error occurred while updating the device state' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the device state' });
  }
};

exports.reportIssue = async (req, res) => {
  const deviceId = req.params.deviceId
  const content = req.body.content
  try {
    const result = await deviceModel.reportIssue(deviceId, content);
    console.log(result);
    res.status(201).json({message: 'Issue reported...', deviceId: deviceId, content: content})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred when reporting an issue with the device.'})
  }
};

exports.addDevice = async (req, res) => {
  let device = req.body;
  device.deviceId = uuidv4(); // generate a UUID

  try {
    const result = await deviceModel.addDevice(device);
    console.log(result);
    res.status(201).json({ message: 'Device added...', deviceId: device.deviceId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the device' });
  }
};

// creates a new loan
exports.createLoan = async (req, res) => {
  try {
    const userId = req.authData.upi;
    const userEmail = req.authData.email;
    const deviceId = req.params.deviceId;
    const loan = { userId, userEmail, deviceId };

    const isAvailable = await deviceModel.isDeviceAvailable(deviceId);
    if (!isAvailable){
      return res.status(403).json({message: 'Device is not available.'})
    }

    const loanId = await loanModel.createLoan(loan);
    if (loanId) {
      const result = await deviceModel.updateState(deviceId, 'Reserved');
      if (result) {
        res.status(201).json({ message: 'Loan created successfully', loanId });
      } else {
        res.status(400).json({message: 'Unable to update state to reserved'});
      }
    } else {
      res.status(400).json({ message: 'Could not create loan' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// to use the write user terms/manager schedule/manager contact info
// send a POST request with a JSON object like: {"content": "The new content for the file..."}

// read user terms (for user and manager)
exports.readUserTerms = (req, res) => {
  const filePath = path.join(__dirname, '../userTerms.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send("Error reading file");
      return res.send(data);
  });
};

// write user terms (for manager only)
exports.writeUserTerms = (req, res) => {
  const filePath = path.join(__dirname, '../userTerms.txt');
  const content = req.body.content;
  fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) return res.status(500).send("Error writing to file");
      return res.send({message: "File written successfully"});
  });
};

// read manager schedule (for user and manager)
exports.readManagerSchedule = (req, res) => {
  const filePath = path.join(__dirname, '../managersSchedule.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send("Error reading file");
      return res.send(data);
  });
};

// write manager schedule (for manager only)
exports.writeManagerSchedule = (req, res) => {
  const filePath = path.join(__dirname, '../managersSchedule.txt');
  const content = req.body.content;
  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) return res.status(500).send("Error writing to file");
    return res.send({message: "File written successfully"});
  });
};

// read contact info of device managers (for user and manager)
exports.readAdminContactInfo = (req, res) => {
  const filePath = path.join(__dirname, '../adminContactInfo.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send("Error reading file");
      return res.send(data);
  });
};

// write contact info of admins (for manager only)
exports.writeAdminContactInfo = (req, res) => {
  const filePath = path.join(__dirname, '../adminContactInfo.txt');
  const content = req.body.content;
  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) return res.status(500).send("Error writing to file");
    return res.send({message: "File written successfully"});
  });
};

// cancels a reservation, used by a user
exports.cancelReservation = async (req, res) => {
  const loanId = req.params.id;
  try {
    const deviceId = await loanModel.getDeviceIdByLoan(loanId);
    const userId = await loanModel.getUserIdByLoan(loanId);
    // check userId = req.authData.upi
    if (userId !== req.authData.upi){
      console.log("User is not associated with loan.");
      console.log("userId:", userId);
      console.log("req.authData.upi:", req.authData.upi);
      console.log("User is not associated with loan.")
      return res.status(403).send({ message: "User is not associated with loan." });
    }
    if (deviceId) {
      const successDevice = await deviceModel.cancelReservation(deviceId);
      const successLoan = await loanModel.removeLoan(loanId);
      if (successDevice && successLoan) {
        res.send({ message: "Reservation cancelled and loan entry deleted successfully" });
      } else {
        res.status(400).send({ message: "Device not found, not reserved or loan not found" });
      }
    } else {
      res.status(400).send({ message: "Loan not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
};

// Get the number of remaining renewals
exports.getRemainingRenewals = async (req, res) => {
  let loanId = req.params.loanId;
  try {
    const remainingRenewals = await loanModel.getRemainingRenewals(loanId);
    if (remainingRenewals !== null) {
      res.send({ remainingRenewals });
    } else {
      res.status(404).send({ message: "Loan not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
};

/*
// for GeneralDeviceExtendScreen.js (extend specific device by its ID)
exports.extendLoanById = async (req, res, next) => {
  try {
    const deviceId = req.params.id;
    const updatedLoan = await loanModel.extendLoanById(deviceId);
    if (updatedLoan) {
      res.status(200).json({ message: 'Loan extended successfully', updatedLoan });
    } else {
      res.status(404).json({ message: 'Loan not found for the given device ID' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error extending loan', error });
  }
};
*/

// Renew a loan
exports.renewLoan = async (req, res) => {
  let loanId = req.params.loanId;
  try {
    const success = await loanModel.renewLoan(loanId);
    if (success) {
      res.send({ message: "Loan renewed successfully" });
    } else {
      res.status(400).send({ message: "Loan not found or no remaining renewals" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
};

// Returns a device and thus marks the loan complete and changes device state back to available.
exports.returnDevice = async (req, res) => {
  let deviceId = req.params.deviceId;
  try {
    const loanCompleted = await loanModel.completeLoan(deviceId);
    if (loanCompleted) {
      const deviceStateUpdated = await deviceModel.updateState(deviceId, 'Available');
      if (deviceStateUpdated) {
        res.send({ message: "Loan marked as completed and device returned" });
      } else {
        res.status(400).send({ message: "Device not found" });
      }
    } else {
      res.status(400).send({ message: "Loan not found or already completed" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
};

// Begin the loan of the reserved device when the user physically picks it up.
exports.beginLoan = async (req, res) => {
  let deviceId = req.params.deviceId
  try {
    const loanBegun = await loanModel.beginLoan(deviceId);
    if (loanBegun) {
      const deviceStateUpdated = await deviceModel.updateState(deviceId, 'Loaned');
      if (deviceStateUpdated) {
        res.status(200).json({message: 'Loan period started'});
      } else {
        res.status(403).json({message: 'Error when updating device state'})
      }
    } else {
      res.status(403).json({message: 'Error when inputting dueDate'})
    }
  } catch (error) {
    res.status(500).send({message: "An error occurred", error});
  }
};

// Retrieves statistics on loans and devices, at the present moment, and during the current year
exports.getCurrentStats = async (req, res) => {
  try {
    const stats = await statsModel.getCurrentStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch current stats' });
  }
};

exports.getYearlyStats = async (req, res) => {
  try {
    const stats = await statsModel.getYearlyStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch yearly stats' });
  }
};

// ... other exports

// deletes a device given its deviceId
exports.deleteDevice = async (req, res, next) => {
  try {
    const deviceId = req.params.deviceId;
    const deleted = await deviceModel.deleteDevice(deviceId);
    if (deleted) {
      res.status(200).json({ message: 'Device deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Device not found.' });
    }
  } catch (error) {
    console.error("Error:", error); // Add this line to log the error to the console
    res.status(500).json({ message: 'Error deleting the device.', error });
  }
};
