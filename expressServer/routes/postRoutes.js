const express = require("express");
const postControllers = require("../controllers/postControllers");
const callback = require("../oauth/callback");
const authorise = require("../oauth/authorise");
const verifyToken = require("../oauth/verifyToken");
const router = express.Router();

// @route GET && POST - /posts/
// Admin methods
router.get("/devices", verifyToken, postControllers.getAllDevices); // getting details of all devices with unique IDs
router.get("/devices/:id", verifyToken, postControllers.getDeviceById); //for DetailDeviceAdmin.js, specific device by ID and details and latest loan
router.get("/devices/nameAvailability", verifyToken, postControllers.getDevicesByNameAvailability); //for AdminDevicesScreen.js (gets deviceName, num_loaned, num_available, category)
router.get("/schedule", verifyToken, postControllers.getSchedule); //for AdminScheduleScreen.js (loads devices reserved & overdue/due this week)
router.get("/details/:name", verifyToken, postControllers.getDetailsByDeviceName); // for GeneralDeviceAdmin.js (given name of device, find its details)
router.get("/idByName/:name", verifyToken, postControllers.getIdByName); // for GeneralDeviceAdmin.js (given name of device, get all device IDs and associated states)
router.get("/loansHistoryByName/:name", verifyToken, postControllers.getLoanHistoryByName); // for GeneralDeviceAdmin.js (given name of a device, find all associated loan history)
// router.post('/devices/insertNewDevice'); // for AdminScanScreen.js (INSERTS id, name, type, state, last_updated or date entered)

// Miscellaneous methods
router.get("/loans", verifyToken, postControllers.getAllLoans);
router.get("/loans/:id", verifyToken, postControllers.getLoanById);
router.get("/summary", verifyToken, postControllers.getDeviceSummary);

// weekly events (on MySQL)
// change reserved -> available if not collected
// send email to those users who have past the expiry date

// for Admin
// posts
// only this week's schedule for reserved devices
// settings edit timeslot and userTerms, contactinfo
// include one more line into device, any issues etc.
// additional states of Maintainance and Scrapped
// last user ID (low priority)
// next user ID (who reserved it) (low priority)
// insert new device data (high priority)
// statistics (current): total devices, available, overdue (high priority)
// statistics (yearly): expenditure, loans, on time, overude, most and least popular
// update device state
// add device
// loan, return
// return new primary keys generated (LAST_INSERT_ID())

// for User
// fetch personal details of admin: contact information
// launch year, availability of devices
// lock device page availability?
// reserve -> add a row in the loans
// cancel reservation based on device
// see if extension possible and return number of extensions left; shows the number of renewals remaining for a specific loan
// extend
// fetch user terms

// User methods
router.get("/devices/nameAvailabilityUser", verifyToken, postControllers.getDevicesByNameAvailabilityUser); // for UserDevicesScreen.js (gets deviceName, launchedYear, num_available, category)
router.get("/devices/deviceByName/:name", verifyToken, postControllers.getDevicebyName); // for GeneralDeviceUser.js (returns details of first available device by its name)
router.get("/loans/loansUser/", verifyToken, postControllers.getLoanHistoryByUser); // for PastDeviceScreen.js (returns all loan history for a specific user)
router.get("/loans/reservedUser/", verifyToken, postControllers.getReservedByUser); // for UserAppointmentScreen.js (selects loans where the the state is reserved and userID is userID)
router.get("/loans/loansCurrent/", verifyToken, postControllers.getCurrentLoans); // for UserLoansScreen.js (returns all current loans for a specific user)
router.post("/loans/extend/:id"); // for GeneralDeviceExtendScreen.js (extend specific device by its ID)

// N/A for UserSettingsScreen.js
// N/A for UserTermScreen.js
router.get("/callback", callback);
router.get("/authorise", authorise);

module.exports = router;