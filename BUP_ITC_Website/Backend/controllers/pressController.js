const Press = require("../models/Press");


exports.getPress = async (req, res) => {
  try {
    const press = await Press.find().sort({ date: -1 });

    res.json(press);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch press releases" });
  }
};
