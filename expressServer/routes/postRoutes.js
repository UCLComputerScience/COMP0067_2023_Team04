const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

// @route GET && POST - /posts/
router.route('/devices').get(postControllers.getAllDevices);
router.route('/devices/:id').get(postControllers.getDeviceById);


router.route('/loans').get(postControllers.getAllLoans);
router.route('/loans/:id').get(postControllers.getLoanById);

router.get('/summary', postControllers.getDeviceSummary);
router.get('/schedule', postControllers.getSchedule);

router.get('/loans/user/:userId', postControllers.getLoansByUserId);
router.get('/loans/device/:deviceId', postControllers.getLoansByDeviceId);
router.post('/loans', postControllers.createLoan);
router.put('/loans/:loanId', postControllers.updateLoan);
router.delete('/loans/:loanId', postControllers.deleteLoan);
router.get('/schedule', postControllers.getSchedule);
router.get('/currentWeekLoans', postControllers.getLoansWithDeviceNamesForCurrentWeek);
router.get('/loanHistory', postControllers.getLoanHistory);
router.put('/extendLoanDueDate', postControllers.extendLoanDueDate);
router.post('/createReservation', postControllers.createReservation);
router.get('/loansByStatus', postControllers.getLoansByStatus);

router.put('/devices/:deviceId/state', postControllers.updateDeviceState);
router.get('/user/devices', postControllers.getAllDevicesUser);

module.exports = router;

/*
router
    .route("/")
    .get(postControllers.getAllPosts)
    .post(postControllers.createNewPost);

router.route("/:id").get(postControllers.getPostById);
router.route('/loans/userId/:userId').get(postControllers.getLoansByUserId);
router.route('/loans').post(postControllers.createLoan);
router.route('/loans/:id').put(postControllers.updateLoan);
router.route('/loans/:id').delete(postControllers.deleteLoan);

*/