const Executive = require("../../models/Executive");
const {
  getUploadedImagePath,
  removeUploadedFile
} = require("../../utils/uploadFiles");

function getDepartment(req) {
  return req.body.department || req.body.batch || "";
}


exports.getAllExecutivesAdmin = async (req, res) => {
  try {
    const data = await Executive.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleExecutiveAdmin = async (req, res) => {
  try {
    const data = await Executive.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Executive not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createExecutiveAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const exec = new Executive({
      name: req.body.name,
      position: req.body.position,
      department: getDepartment(req),
      linkedin: req.body.linkedin,
      image: imagePath
    });

    const saved = await exec.save();
    shouldCleanupNewImage = false;

    res.status(201).json(saved);
  } catch (err) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: err.message });
  }
};


exports.updateExecutiveAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const existingExecutive = await Executive.findById(req.params.id);

    if (!existingExecutive) {
      await removeUploadedFile(imagePath);
      return res.status(404).json({ message: "Executive not found" });
    }

    const updateData = {
      name: req.body.name,
      position: req.body.position,
      department: getDepartment(req),
      linkedin: req.body.linkedin
    };

    if (req.file) {
      updateData.image = imagePath;
    }

    const updated = await Executive.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (req.file) {
      shouldCleanupNewImage = false;
      await removeUploadedFile(existingExecutive.image);
    }

    res.json(updated);
  } catch (err) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: err.message });
  }
};


exports.deleteExecutiveAdmin = async (req, res) => {
  try {
    const deleted = await Executive.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Executive not found" });
    }

    await removeUploadedFile(deleted.image);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
