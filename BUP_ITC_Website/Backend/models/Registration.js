const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    department: {
      type: String,
      required: true
    },

    batch: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    skills: {
      type: String,
      default: ""
    },

    portfolio: {
      type: String,
      default: ""
    },

    motivation: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Registration", registrationSchema);