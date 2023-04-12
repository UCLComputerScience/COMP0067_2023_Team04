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

exports.getAllLoans = async (req, res, next) => {
  try {
    const loans = await loanModel.getAllLoans();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error });
  }
};

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

exports.getSchedule = async (req, res) => {
  try {
    const schedule = await loanModel.getSchedule();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({error: 'An error occurred while fetching the schedule.' });
  }
};



// More controllers
/*
exports.getLoansByUserId = async (req, res, next) => {
    try {
    const loans = await loanModel.getLoansByUserId(req.params.userId);
    res.status(200).json(loans);
    } catch (error) {
    res.status(500).json({ message: 'Error fetching loans by user ID', error });
    }
    };

exports.createLoan = async (req, res, next) => {
try {
const { userId, startDate, dueDate, deviceId, exten, scheduledCollectionDate, scheduledReturnDate } = req.body;
const newLoan = await loanModel.createLoan(userId, startDate, dueDate, deviceId, exten, scheduledCollectionDate, scheduledReturnDate);
res.status(201).json(newLoan);
} catch (error) {
res.status(500).json({ message: 'Error creating loan', error });
}
};

exports.updateLoan = async (req, res, next) => {
try {
const updated = await loanModel.updateLoan(req.params.id, req.body);
if (updated) {
res.status(200).json({ message: 'Loan updated successfully' });
} else {
res.status(404).json({ message: 'Loan not found' });
}
} catch (error) {
res.status(500).json({ message: 'Error updating loan', error });
}
};

exports.deleteLoan = async (req, res, next) => {
try {
const deleted = await loanModel.deleteLoan(req.params.id);
if (deleted) {
res.status(200).json({ message: 'Loan deleted successfully' });
} else {
res.status(404).json({ message: 'Loan not found' });
}
} catch (error) {
res.status(500).json({ message: 'Error deleting loan', error });
}
};

exports.createLoan = async (req, res, next) => {
try {
const { userId, startDate, dueDate, deviceId, exten, scheduledCollectionDate, scheduledReturnDate } = req.body;
const newLoan = await loanModel.createLoan(userId, startDate, dueDate, deviceId, exten, scheduledCollectionDate, scheduledReturnDate);
res.status(201).json(newLoan);
} catch (error) {
res.status(500).json({ message: 'Error creating loan', error });
}
};

exports.updateLoan = async (req, res, next) => {
try {
const updated = await loanModel.updateLoan(req.params.id, req.body);
if (updated) {
res.status(200).json({ message: 'Loan updated successfully' });
} else {
res.status(404).json({ message: 'Loan not found' });
}
} catch (error) {
res.status(500).json({ message: 'Error updating loan', error });
}
};

exports.deleteLoan = async (req, res, next) => {
try {
const deleted = await loanModel.deleteLoan(req.params.id);
if (deleted) {
res.status(200).json({ message: 'Loan deleted successfully' });
} else {
res.status(404).json({ message: 'Loan not found' });
}
} catch (error) {
res.status(500).json({ message: 'Error deleting loan', error });
}
};


exports.getAllPosts = async (req, res, next) => {
    res.send("Get all posts route");
};

exports.createNewPost = async (req, res, next) => {
    res.send("Create New Post Route");
};

exports.getPostById = async (req, res, next) => {
    res.send("Get Post By ID Route");
};
*/