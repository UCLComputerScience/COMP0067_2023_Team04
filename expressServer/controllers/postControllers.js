const deviceModel = require('../models/deviceModel');
const loanModel = require('../models/loanModel');

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
    const deviceName = req.query.name;
    const device = await deviceModel.getDetailsByDeviceName(deviceName);
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device details', error });
  }
};

// for GeneralDeviceAdmin.js (given name of device, get all device IDs and associated states)
exports.getIdByName = async (req, res, next) => {
  try {
    const deviceName = req.query.name;
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