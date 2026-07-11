const Press = require("../../models/Press");
const {
  getUploadedImagePath,
  removeUploadedFile
} = require("../../utils/uploadFiles");


exports.getAllPressAdmin = async (req, res) => {
  try {
    const press = await Press.find().sort({ date: -1 });
    res.json(press);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSinglePressAdmin = async (req, res) => {
  try {
    const press = await Press.findById(req.params.id);

    if (!press) {
      return res.status(404).json({ message: "Press not found" });
    }

    res.json(press);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createPressAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const newPress = new Press({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      category: req.body.category,
      image: imagePath
    });

    const saved = await newPress.save();
    shouldCleanupNewImage = false;

    res.status(201).json(saved);
  } catch (error) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: error.message });
  }
};


exports.updatePressAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const existingPress = await Press.findById(req.params.id);

    if (!existingPress) {
      await removeUploadedFile(imagePath);
      return res.status(404).json({ message: "Press not found" });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = imagePath;
    }

    const updated = await Press.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (req.file) {
      shouldCleanupNewImage = false;
      await removeUploadedFile(existingPress.image);
    }

    res.json(updated);
  } catch (error) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: error.message });
  }
};


exports.deletePressAdmin = async (req, res) => {
  try {
    const deleted = await Press.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Press not found" });
    }

    await removeUploadedFile(deleted.image);

    res.json({ message: "Press deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
