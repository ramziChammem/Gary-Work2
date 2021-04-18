const mongoose = require("mongoose");
const adminMessages = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", adminMessages);

module.exports = Messages;
