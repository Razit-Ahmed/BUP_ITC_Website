const Alumni = require("../../models/Alumni");
const {
  getUploadedImagePath,
  removeUploadedFile
} = require("../../utils/uploadFiles");


exports.getAllAlumniAdmin = async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 });
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getSingleAlumniAdmin = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createAlumniAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const alumni = new Alumni({
      name: req.body.name || "",
      position: req.body.position || "",
      batch: req.body.batch || "",
      linkedin: req.body.linkedin || "",
      image: imagePath
    });

    const saved = await alumni.save();
    shouldCleanupNewImage = false;
    res.status(201).json(saved);

  } catch (err) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: err.message });
  }
};


exports.updateAlumniAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const existingAlumni = await Alumni.findById(req.params.id);

    if (!existingAlumni) {
      await removeUploadedFile(imagePath);
      return res.status(404).json({ message: "Alumni not found" });
    }

    const updatedData = {
      name: req.body.name || "",
      position: req.body.position || "",
      batch: req.body.batch || "",
      linkedin: req.body.linkedin || ""
    };

    if (req.file) {
      updatedData.image = imagePath;
    }

    const updated = await Alumni.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true
      }
    );

    if (req.file) {
      shouldCleanupNewImage = false;
      await removeUploadedFile(existingAlumni.image);
    }

    res.json(updated);

  } catch (err) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: err.message });
  }
};


exports.deleteAlumniAdmin = async (req, res) => {
  try {
    const deleted = await Alumni.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    await removeUploadedFile(deleted.image);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
