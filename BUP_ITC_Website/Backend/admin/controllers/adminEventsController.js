const Event = require("../../models/Event");
const {
  normalizeEventPayload,
  serializeEvent
} = require("../../utils/eventPayload");
const {
  getUploadedImagePath,
  removeUploadedFile
} = require("../../utils/uploadFiles");


exports.getAllEventsAdmin = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events.map(serializeEvent));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSingleEventAdmin = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(serializeEvent(event));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createEventAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const newEvent = new Event(
      normalizeEventPayload({
        ...req.body,
        image: imagePath
      })
    );

    const savedEvent = await newEvent.save();
    shouldCleanupNewImage = false;

    res.status(201).json(savedEvent);

  } catch (error) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: error.message });
  }
};


exports.updateEventAdmin = async (req, res) => {
  const imagePath = getUploadedImagePath(req.file);
  let shouldCleanupNewImage = Boolean(req.file);

  try {
    const existingEvent = await Event.findById(req.params.id);

    if (!existingEvent) {
      await removeUploadedFile(imagePath);
      return res.status(404).json({ message: "Event not found" });
    }

    const updateData = normalizeEventPayload({ ...req.body });

    if (req.file) {
      updateData.image = imagePath;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (req.file) {
      shouldCleanupNewImage = false;
      await removeUploadedFile(existingEvent.image);
    }

    res.json(updatedEvent);

  } catch (error) {
    if (shouldCleanupNewImage) {
      await removeUploadedFile(imagePath);
    }
    res.status(500).json({ message: error.message });
  }
};


exports.deleteEventAdmin = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    await removeUploadedFile(deletedEvent.image);

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
