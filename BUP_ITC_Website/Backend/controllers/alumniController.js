const Alumni = require("../models/Alumni");

exports.getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ batch: -1 });

    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch alumni" });
  }
};
