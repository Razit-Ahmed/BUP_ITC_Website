const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    position: {
      type: String,
      required: true
    },

    batch: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    linkedin: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Alumni", alumniSchema);