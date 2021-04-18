const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    serviceProviderEmail: { type: String, required: true },
    userName: { type: String },
    userId: { type: String, required: true },
    rate: { type: Number, required: true },
    reviewTitle: { type: String, required: true },
    reviewBody: { type: String, required: true },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
