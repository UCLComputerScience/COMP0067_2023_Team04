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

router.get('/loans/user/:userId', postControllers.getLoansByUserId); //checked
router.get('/loans/devices/:deviceId', postControllers.getLoansByDeviceId); //checked
router.post('/loans', postControllers.createLoan); //TODO
router.put('/loans/:loanId', postControllers.updateLoan); //TODO
router.delete('/loans/:loanId', postControllers.deleteLoan); //checked
router.get('/schedule', postControllers.getSchedule); //NEED SUITABLE DATA TO TEST
router.get('/currentWeekLoans', postControllers.getLoansWithDeviceNamesForCurrentWeek); //NEED SUITABLE DATA TO TEST
router.get('/loanHistory', postControllers.getLoanHistory); //checked
router.put('/extendLoanDueDate', postControllers.extendLoanDueDate); //TODO
router.post('/createReservation', postControllers.createReservation); //TODO
router.get('/loansByStatus', postControllers.getLoansByStatus); //TODO

router.put('/devices/:deviceId/state', postControllers.updateDeviceState); //TOTEST
router.get('/user/devices', postControllers.getAllDevicesUser); //TOTEST

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