const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminAuth = require("../middleware/adminAuth");
const { storage } = require("../../utils/uploadFiles");

const {
  getAllPressAdmin,
  getSinglePressAdmin,
  createPressAdmin,
  updatePressAdmin,
  deletePressAdmin
} = require("../controllers/adminPressController");

const upload = multer({ storage });


router.get("/", adminAuth, getAllPressAdmin);
router.get("/:id", adminAuth, getSinglePressAdmin);

router.post("/", adminAuth, upload.single("image"), createPressAdmin);
router.put("/:id", adminAuth, upload.single("image"), updatePressAdmin);

router.delete("/:id", adminAuth, deletePressAdmin);

module.exports = router;
