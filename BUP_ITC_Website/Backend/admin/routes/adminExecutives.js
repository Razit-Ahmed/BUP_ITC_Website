const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminAuth = require("../middleware/adminAuth");
const { storage } = require("../../utils/uploadFiles");

const {
  getAllExecutivesAdmin,
  getSingleExecutiveAdmin,
  createExecutiveAdmin,
  updateExecutiveAdmin,
  deleteExecutiveAdmin
} = require("../controllers/adminExecutivesController");

const upload = multer({ storage });

router.get("/", adminAuth, getAllExecutivesAdmin);
router.get("/:id", adminAuth, getSingleExecutiveAdmin);

router.post("/", adminAuth, upload.single("image"), createExecutiveAdmin);
router.put("/:id", adminAuth, upload.single("image"), updateExecutiveAdmin);

router.delete("/:id", adminAuth, deleteExecutiveAdmin);

module.exports = router;
