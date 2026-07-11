const Registration = require("../models/Registration");


exports.submitRegistration = async (req, res) => {
  try {
    const {
      name,
      studentId,
      department,
      batch,
      email,
      phone,
      skills,
      motivation,
      portfolio
    } = req.body;

    const registration = new Registration({
      name,
      studentId,
      department,
      batch,
      email,
      phone,
      skills,
      motivation,
      portfolio
    });

    await registration.save();

    res.status(201).json({
      message: "Application submitted successfully",
      registration
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });

  }
};


exports.getRegistrations = async (req, res) => {
  try {

    const registrations = await Registration.find().sort({ createdAt: -1 });

    res.json(registrations);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};



exports.updateStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!registration) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(registration);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};



exports.checkStatus = async (req, res) => {
  try {

    const { studentId, email } = req.query;

    if (!studentId && !email) {
      return res.status(400).json({
        message: "Provide studentId or email"
      });
    }

    const registration = await Registration.findOne({
      $or: [
        { studentId },
        { email }
      ]
    });

    if (!registration) {
      return res.status(404).json({
        message: "No application found"
      });
    }

    res.json({
      name: registration.name,
      status: registration.status
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });

  }
};
