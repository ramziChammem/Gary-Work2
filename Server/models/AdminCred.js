const mongoose = require("mongoose");
const adminAccount = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
});

const login = mongoose.model("Login", adminAccount);

module.exports = login;
