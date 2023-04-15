const express = require('express');
const authorise = require('./authorise');
const callback = require('./callback');

const router = express.Router();

router.get('/', authorise);
router.get('/callback', callback);

module.exports = router;