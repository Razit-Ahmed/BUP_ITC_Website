const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");

async function connectDB() {
  try {
    console.log("MONGODB_URI =", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;