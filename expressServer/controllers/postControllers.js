const deviceModel = require('../models/deviceModel');
const loanModel = require('../models/loanModel');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const isUserAdmin = require('../oauth/isUserAdmin');

async function authorizedAction(upi, res, action) {
  const isAdmin = await isUserAdmin(upi);
  if (!isAdmin) {
    return res.status(403).send("You are not authorized to perform this action");
  }
  action();
}

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

//for AdminDevicesScreen.js (gets deviceName, num_loaned, num_available, category)
exports.getDevicesByNameAvailability = async (req, res, next) => {
  try {
    const devices = await deviceModel.getDevicesByNameAvailability();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices by name and availability', error });
  }
};

// for UserDevicesScreen.js (gets deviceName, launchedYear, num_available, category)
exports.getDevicesByNameAvailabilityUser = async (req, res, next) => {
  try {
    const devices = await deviceModel.getDevicesByNameAvailabilityUser();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices for user by name and availability', error });
  }
};

// Misc
exports.getDeviceSummary = async (req, res) => {
  try {
    const deviceSummary = await deviceModel.getDeviceSummary();
    res.status(200).json({
      status: 'success',
      data: {
        deviceSummary,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the device summary',
    });
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
    res.status(200).json(device);
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

// for PastDeviceScreen.js (returns all loan history for a specific user)
exports.getLoanHistoryByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const loanHistory = await loanModel.getLoanHistoryByUser(userId);
    res.status(200).json(loanHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan history by user', error });
  }
};

// for UserAppointmentScreen.js (selects loans where the state is reserved and userID is userID)
exports.getReservedByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const reservedDevices = await loanModel.getReservedByUser(userId);
    res.status(200).json(reservedDevices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reserved devices by user', error });
  }
};

// for UserLoansScreen.js (returns all current loans for a specific user)
exports.getCurrentLoans = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const currentLoans = await loanModel.getCurrentLoans(userId);
    res.status(200).json(currentLoans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current loans by user', error });
  }
};

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

// updates device state to state specified in JSON object
exports.updateDeviceState = (req, res) => {
  let newState = req.body.state;
  let deviceId = req.params.deviceId;

  // Validate the state
  const validStates = ['Available', 'Reserved', 'Loaned', 'Maintenance', 'Scrapped'];
  if (!validStates.includes(newState)) {
      return res.status(400).json({ error: 'Invalid state' });
  }

  deviceModel.updateState(deviceId, newState, (err, result) => {
      if(err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while updating the device state' });
      }
      console.log(result);
      res.send('Device state updated...');
  });
};

// enters a new device into the database
exports.addDevice = (req, res) => {
  let device = req.body;
  device.deviceId = uuidv4();  // generate a UUID

  deviceModel.addDevice(device, (err, result) => {
      if(err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while adding the device' });
      }
      console.log(result);
      res.status(201).json({ message: 'Device added...', deviceId: device.deviceId });
  });
};

// creates a new loan
exports.createLoan = async (req, res) => {
  try {
    const userId = req.user.upi;
    const userEmail = req.user.email;
    const deviceId = req.body.deviceId;
    const loan = { userId, userEmail, deviceId };

    const loanId = await loanModel.createLoan(loan);

    if (loanId) {
      res.status(201).json({ message: 'Loan created successfully', loanId });
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
  authorizedAction(req.user.upi, res, () => {
    const filePath = path.join(__dirname, '../managersSchedule.txt');
    const content = req.body.content;
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) return res.status(500).send("Error writing to file");
      return res.send({message: "File written successfully"});
    });
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
  authorizedAction(req.user.upi, res, () => {
    const filePath = path.join(__dirname, '../adminContactInfo.txt');
    const content = req.body.content;
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) return res.status(500).send("Error writing to file");
      return res.send({message: "File written successfully"});
    });
  });
};

// Cancel a reservation
exports.cancelReservation = async (req, res) => {
  const deviceId = req.params.id;
  const upi = req.authData.upi;

  try {
    const result = await deviceModel.cancelReservation(deviceId, upi);
    if (result) {
      res.send({ message: "Reservation cancelled successfully" });
    } else {
      res.status(400).send({ message: "Reservation could not be cancelled, possibly because it was not made by the current user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while cancelling the reservation" });
  }
};