const mongoose = require("mongoose");

// schema of user registration form
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// document name will become users in database
module.exports = mongoose.model("Note", noteSchema);
