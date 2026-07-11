const Registration = require("../../models/Registration");

exports.getRegistrations = async (req, res) => {

  try {

    const registrations = await Registration.find().sort({ createdAt: -1 });

    res.json(registrations);

  } catch (error) {

    res.status(500).json({ message: "Failed to load registrations" });

  }

};


exports.updateRegistrationStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updated);

  } catch (error) {

    res.status(500).json({ message: "Update failed" });

  }

};
