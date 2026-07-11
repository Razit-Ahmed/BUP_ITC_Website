const mongoose = require("mongoose");

const executiveSchema = new mongoose.Schema(
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

    department: {
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

module.exports = mongoose.model("Executive", executiveSchema);