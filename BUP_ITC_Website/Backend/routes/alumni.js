const express = require("express");
const router = express.Router();

const { getAlumni } = require("../controllers/alumniController");

router.get("/", getAlumni);

module.exports = router;