// Always use the URL format https://0067team4app.azurewebsites.net/posts/... for any of the methods listed here
const express = require("express");
const postControllers = require("../controllers/postControllers");
const callback = require("../oauth/callback");
const authorise = require("../oauth/authorise");
const verifyToken = require('../oauth/verifyToken').verifyToken;
const verifyAdmin = require('../oauth/verifyToken').verifyAdmin;
const router = express.Router();

// Authentication methods
router.get("/authorise", authorise); //used for SSO login
router.get("/callback", callback); //used after log in successful

// Admin GET methods
router.get("/devices", verifyAdmin, postControllers.getAllDevices); // getting details of all devices with unique IDs
router.get("/devices/:id", verifyAdmin, postControllers.getDeviceById); //for DetailDeviceAdmin.js, specific device by ID and details and latest loan
router.get("/nameAvailability", verifyAdmin, postControllers.getDevicesByNameAvailability); //for AdminDevicesScreen.js (gets deviceName, num_loaned, num_available, category)
router.get("/schedule", verifyAdmin, postControllers.getSchedule); //for AdminScheduleScreen.js (loads devices reserved & overdue/due this week)
router.get("/details/:name", verifyAdmin, postControllers.getDetailsByDeviceName); // for GeneralDeviceAdmin.js (given name of device, find its details)
router.get("/idByName/:name", verifyAdmin, postControllers.getIdByName); // for GeneralDeviceAdmin.js (given name of device, get all device IDs and associated states)
router.get("/loansHistoryByName/:name", verifyAdmin, postControllers.getLoanHistoryByName); // for GeneralDeviceAdmin.js (given name of a device, find all associated loan history)
router.get("/latestLoan/:deviceId", verifyAdmin, postControllers.getLatestLoan); //gets the latest loan for a device given its ID; returns empty array if no "latest loan"

// Admin GET stats methods
router.get('/stats/current', verifyAdmin, postControllers.getCurrentStats);
router.get('/stats/yearly', verifyAdmin, postControllers.getYearlyStats);

// Admin PUT methods
router.put('/changeState/:id', verifyAdmin, postControllers.updateDeviceState); // **--------** changes device state to state specified in JSON object, id is deviceId
router.put('/reportIssue/:deviceId', verifyAdmin, postControllers.reportIssue); // **--------** for the admin to input a string describing an issue for a particular device ID

// Admin POST methods
router.post('/addDevice/', verifyAdmin, postControllers.addDevice); //**--------** enter new device into database
router.post('/return/:deviceId', verifyAdmin, postControllers.returnDevice); //**--------** used when physically returning a device, by its ID

// Admin POST file writing methods
router.post("/writeUserTerms", verifyAdmin, postControllers.writeUserTerms); //**--------**
router.post("/writeManagerSchedule", verifyAdmin, postControllers.writeManagerSchedule); //**--------**
router.post("/writeAdminContactInfo", verifyAdmin, postControllers.writeAdminContactInfo); //**--------**

// Both GET file reading methods
router.get("/readUserTerms", verifyToken, postControllers.readUserTerms); //both, UserTermScreen.js
router.get("/readManagerSchedule", verifyToken, postControllers.readManagerSchedule); //both
router.get("/readAdminContactInfo", verifyToken, postControllers.readAdminContactInfo); //both

// User GET methods
router.get("/nameAvailabilityUser", verifyToken, postControllers.getDevicesByNameAvailabilityUser); // for UserDevicesScreen.js (gets deviceName, launchedYear, num_available, category)
router.get("/deviceByName/:name", verifyToken, postControllers.getDevicebyName); // for GeneralDeviceUser.js (returns details of first available device by its name)

router.get("/loansUser", verifyToken, postControllers.getLoanHistoryByUser); // for PastDeviceScreen.js (returns all loan history for a specific user) 
router.get("/reservedUser", verifyToken, postControllers.getReservedByUser); // for UserAppointmentScreen.js (selects loans where the the state is reserved and userID is userID)
router.get("/loansCurrent", verifyToken, postControllers.getCurrentLoans); // for UserLoansScreen.js (returns all current loans for a specific user)

// User POST methods
router.post('/createLoan/:deviceId', verifyToken, postControllers.createLoan); // create a new loan (with state 'Reserved')

// User PUT methods
router.put('/cancelReservation/:id', verifyToken, postControllers.cancelReservation); // **--------** id is loanId

// User Loan renewal methods
router.get("/remainingRenewals/:loanId", verifyToken, postControllers.getRemainingRenewals);
router.put("/renew/:loanId", verifyToken, postControllers.renewLoan); // **--------** for GeneralDeviceExtendScreen.js (extend specific device by loanId) 

// Miscellaneous methods
router.get("/loans", verifyToken, postControllers.getAllLoans);
router.get("/loans/:id", verifyToken, postControllers.getLoanById);

// no methods for UserSettingsScreen.js

module.exports = router;