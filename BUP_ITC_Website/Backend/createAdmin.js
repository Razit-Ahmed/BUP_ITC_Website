const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

async function createAdmin() {
  try {
    await connectDB();

    const password = await bcrypt.hash("admin123", 10);

    const admin = await Admin.findOneAndUpdate(
      { username: "admin" },
      { username: "admin", password },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    console.log(`Admin ready: ${admin.username}`);
    process.exit();
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
