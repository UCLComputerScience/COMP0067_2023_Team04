// expressServer/oauth/index.js
const express = require('express');
const authorise = require('./authorise');
const callback = require('./callback');

const router = express.Router();

router.get('/', authorise);
console.log("Accessing authorise route");
router.get('/callback', callback);
console.log("Accessing callback route");

module.exports = router;