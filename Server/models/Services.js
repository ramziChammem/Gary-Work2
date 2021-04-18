const mongoose = require("mongoose");
const services = new mongoose.Schema({
  profession: { type: String, required: true },
  image : {type:String}
});
const Services = mongoose.model("Services", services);

module.exports = Services;
