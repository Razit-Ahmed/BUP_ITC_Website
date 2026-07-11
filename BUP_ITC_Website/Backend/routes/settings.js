const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settingsController");
const adminAuth = require("../admin/middleware/adminAuth");

router.get("/", settingsController.getSettings);

router.put("/", adminAuth, settingsController.toggleRegistration);

module.exports = router;
