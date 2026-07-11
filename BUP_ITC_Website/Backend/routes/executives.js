const express = require("express");
const router = express.Router();

const { getExecutives } = require("../controllers/executivesController");

router.get("/", getExecutives);

module.exports = router;