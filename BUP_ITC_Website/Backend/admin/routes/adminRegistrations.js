const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");
const controller = require("../controllers/adminRegistrationsController");

router.get("/", adminAuth, controller.getRegistrations);

router.patch("/:id", adminAuth, controller.updateRegistrationStatus);

module.exports = router;