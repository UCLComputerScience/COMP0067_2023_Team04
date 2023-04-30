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
// gives the username to frontend
// shows the number of renewals remaining

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