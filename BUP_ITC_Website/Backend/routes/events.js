const express = require("express");
const router = express.Router();

const {
  getEvents,
  getSingleEvent,
  createEvent
} = require("../controllers/eventsController");

const adminAuth = require("../admin/middleware/adminAuth");

router.get("/", getEvents);


router.get("/:id", getSingleEvent);


router.post("/", adminAuth, createEvent);

module.exports = router;