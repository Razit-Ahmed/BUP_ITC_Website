const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registrationController");
const adminAuth = require("../admin/middleware/adminAuth");


router.post("/", registrationController.submitRegistration);


router.get("/", adminAuth, registrationController.getRegistrations);


router.patch("/:id", adminAuth, registrationController.updateStatus);


router.get("/status", registrationController.checkStatus);

module.exports = router;
