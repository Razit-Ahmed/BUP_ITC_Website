const Settings = require("../models/Settings");

exports.getSettings = async (req, res) => {
  try {

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({ registrationOpen: false });
    }

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};


exports.toggleRegistration = async (req, res) => {
  try {

    const { registrationOpen } = req.body;

    if (typeof registrationOpen !== "boolean") {
      return res.status(400).json({
        message: "registrationOpen must be boolean"
      });
    }

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({ registrationOpen });
    } else {
      settings.registrationOpen = registrationOpen;
    }

    await settings.save();

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};
