const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bup_itc",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image",
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname.split(".")[0]}`;
    }
  }
});

function getUploadedImagePath(file) {
  return file ? file.path : "";
}

async function removeUploadedFile(imagePath) {
  if (!imagePath) return;

  try {
    const parts = imagePath.split("/");
    const filename = parts[parts.length - 1];
    const publicId = filename.substring(0, filename.lastIndexOf("."));

    await cloudinary.uploader.destroy(`bup_itc/${publicId}`);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
}

module.exports = {
  storage,
  getUploadedImagePath,
  removeUploadedFile
};