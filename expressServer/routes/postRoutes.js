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