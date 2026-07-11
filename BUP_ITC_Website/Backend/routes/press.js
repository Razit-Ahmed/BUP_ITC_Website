const express = require("express");
const router = express.Router();

const { getPress } = require("../controllers/pressController");

router.get("/", getPress);

module.exports = router;