const mongoose = require("mongoose");

// schema for the user
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    repeatedPassword: { type: String },
    phoneNumber: { type: Number },
    isServiceProvider: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    imageUrl: { type: String },
    location: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
