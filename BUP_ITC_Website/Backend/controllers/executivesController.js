const Executive = require("../models/Executive");

exports.getExecutives = async (req, res) => {
  try {
    const executives = await Executive.find();

    res.json(executives);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch executives"
    });
  }
};
