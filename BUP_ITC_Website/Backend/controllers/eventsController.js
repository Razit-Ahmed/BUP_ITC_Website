const Event = require("../models/Event");

const {
  normalizeEventPayload,
  serializeEvent
} = require("../utils/eventPayload");



exports.getEvents = async (req, res) => {

  try {

    const events = await Event.find().sort({ date: -1 });

    res.json(events.map(serializeEvent));

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch events"
    });

  }

};



exports.getSingleEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({
        message: "Event not found"
      });

    }

    res.json(serializeEvent(event));

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch event"
    });

  }

};



exports.createEvent = async (req, res) => {

  try {

    const event = new Event(
      normalizeEventPayload(req.body)
    );

    await event.save();

    res.status(201).json(event);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create event"
    });

  }

};