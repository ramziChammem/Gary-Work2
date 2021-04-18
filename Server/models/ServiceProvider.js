const mongoose = require("mongoose");
//

const serviceProviderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    profession: { type: String, required: true },
    location: { type: String, required: true },
    gender: { type: String, required: true },
    imageUrl: { type: String },
    isServiceProvider: { type: Boolean, default: true },
    rates: [Number],
    isBanned: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isDeclined: { type: Boolean, default: false },
    CIN: { type: Number },
    description: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  { timestamps: true }
);
const ServiceProvider = mongoose.model(
  "ServiceProviders",
  serviceProviderSchema
);

module.exports = ServiceProvider;
