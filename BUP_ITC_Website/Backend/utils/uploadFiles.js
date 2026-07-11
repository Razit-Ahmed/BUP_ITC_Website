const fs = require("fs/promises");
const multer = require("multer");
const path = require("path");

const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

function getUploadedImagePath(file) {
  return file ? `/uploads/${file.filename}` : "";
}

async function removeUploadedFile(imagePath) {
  if (!imagePath || !imagePath.startsWith("/uploads/")) {
    return;
  }

  const absolutePath = path.join(UPLOADS_DIR, path.basename(imagePath));

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

module.exports = {
  storage,
  UPLOADS_DIR,
  getUploadedImagePath,
  removeUploadedFile
};
