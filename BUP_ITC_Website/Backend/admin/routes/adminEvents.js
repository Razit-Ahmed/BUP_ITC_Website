const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminAuth = require("../middleware/adminAuth");
const { storage } = require("../../utils/uploadFiles");

const {
  getAllEventsAdmin,
  getSingleEventAdmin,
  createEventAdmin,
  updateEventAdmin,
  deleteEventAdmin
} = require("../controllers/adminEventsController");

const upload = multer({ storage });


router.get("/", adminAuth, getAllEventsAdmin);
router.get("/:id", adminAuth, getSingleEventAdmin);

router.post("/", adminAuth, upload.single("image"), createEventAdmin);
router.put("/:id", adminAuth, upload.single("image"), updateEventAdmin);

router.delete("/:id", adminAuth, deleteEventAdmin);

module.exports = router;
