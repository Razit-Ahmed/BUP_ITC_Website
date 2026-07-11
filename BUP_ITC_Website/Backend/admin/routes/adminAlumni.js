const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminAuth = require("../middleware/adminAuth");
const { storage } = require("../../utils/uploadFiles");

const {
  getAllAlumniAdmin,
  getSingleAlumniAdmin,
  createAlumniAdmin,
  updateAlumniAdmin,
  deleteAlumniAdmin
} = require("../controllers/adminAlumniController");

const upload = multer({ storage });

router.get("/", adminAuth, getAllAlumniAdmin);
router.get("/:id", adminAuth, getSingleAlumniAdmin);

router.post("/", adminAuth, upload.single("image"), createAlumniAdmin);
router.put("/:id", adminAuth, upload.single("image"), updateAlumniAdmin);

router.delete("/:id", adminAuth, deleteAlumniAdmin);

module.exports = router;
