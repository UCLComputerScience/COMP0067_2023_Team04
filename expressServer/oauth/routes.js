const express = require("express");
const router = express.Router();

const authorise = require("./authorise");
const callback = require("./callback");

router.get("/", authorise);
router.get("/callback", callback);

module.exports = router;
