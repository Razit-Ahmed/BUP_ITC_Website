const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { PORT } = require("./config/env");

const eventRoutes = require("./routes/events");
const pressRoutes = require("./routes/press");
const executiveRoutes = require("./routes/executives");
const alumniRoutes = require("./routes/alumni");
const registrationRoutes = require("./routes/registration");
const settingsRoutes = require("./routes/settings");

const adminRoutes = require("./routes/admin");
const adminEventRoutes = require("./admin/routes/adminEvents");
const adminPressRoutes = require("./admin/routes/adminPress");
const adminExecutiveRoutes = require("./admin/routes/adminExecutives");
const adminAlumniRoutes = require("./admin/routes/adminAlumni");
const adminRegistrationRoutes = require("./admin/routes/adminRegistrations");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/events", eventRoutes);
app.use("/api/press", pressRoutes);
app.use("/api/executives", executiveRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/settings", settingsRoutes);

app.use("/admin", adminRoutes);
app.use("/admin/events", adminEventRoutes);
app.use("/admin/press", adminPressRoutes);
app.use("/admin/executives", adminExecutiveRoutes);
app.use("/admin/alumni", adminAlumniRoutes);
app.use("/admin/registrations", adminRegistrationRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BUP ITC Backend Running"
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});