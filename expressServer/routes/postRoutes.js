const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

// @route GET && POST - /posts/
// Admin methods
router.route('/devices').get(postControllers.getAllDevices); // getting details of all devices with unique IDs
router.route('/devices/:id').get(postControllers.getDeviceById); //for DetailDeviceAdmin.js, specific device by ID and details and latest loan
router.route('/devices/nameAvailability').get(postControllers.getDevicesByNameAvailability); //for AdminDevicesScreen.js (gets deviceName, num_loaned, num_available, category)
router.get('/schedule', postControllers.getSchedule); //for AdminScheduleScreen.js (loads devices reserved & overdue/due this week)
router.get('/details/:name', postControllers.getDetailsByDeviceName); // for GeneralDeviceAdmin.js (given name of device, find its details)
router.get('/idByName/:name', postControllers.getIdByName); // for GeneralDeviceAdmin.js (given name of device, get all device IDs and associated states)
router.get('/loansHistoryByName/:name', postControllers.getLoanHistoryByName); // for GeneralDeviceAdmin.js (given name of a device, find all associated loan history)
// router.post('/devices/insertNewDevice'); // for AdminScanScreen.js (INSERTS id, name, type, state, last_updated or date entered)

// Miscellaneous methods
router.route('/loans').get(postControllers.getAllLoans);
router.route('/loans/:id').get(postControllers.getLoanById);
router.get('/summary', postControllers.getDeviceSummary);

// User methods
router.get('/devices/nameAvailabilityUser', postControllers.getDevicesByNameAvailabilityUser); // for UserDevicesScreen.js (gets deviceName, launchedYear, num_available, category)
router.get('/devices/deviceByName/:name', postControllers.getDevicebyName); // for GeneralDeviceUser.js (returns details of first available device by its name)
router.get('/loans/loansUser/:userId', postControllers.getLoanHistoryByUser); // for PastDeviceScreen.js (returns all loan history for a specific user)
router.get('/loans/reservedUser/:userId', postControllers.getReservedByUser); // for UserAppointmentScreen.js (selects loans where the the state is reserved and userID is userID)
router.get('/loans/loansCurrent/:userId', postControllers.getCurrentLoans); // for UserLoansScreen.js (returns all current loans for a specific user)
router.post('/loans/extend/:id'); // for GeneralDeviceExtendScreen.js (extend specific device by its ID)

// N/A for UserSettingsScreen.js
// N/A for UserTermScreen.js

module.exports = router;