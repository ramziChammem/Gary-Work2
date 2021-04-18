const ServiceProviderList = require("../models/ServiceProvider.js");

module.exports = {
  addServices: async (req, res) => {
    const service = new ServiceProviderList({
      firstName: "firstName",
      lastName: "lastName",
      fullName: req.body.fullName,
      email: "email",
      password: "pass",
      phoneNumber: 58065605,
      profession: req.body.profession,
      location: req.body.location,
      gender: "male/female",
      imageUrl: req.body.imageUrl,
      isServiceProvider: true,
    });
    try {
      const savedService = await service.save();
      res.json(savedService);
    } catch (err) {
      res.json({ message: err });
    }
  },

  findAll: async (req, res) => {
    try {
      const services = await ServiceProviderList.find();
      res.send(services);
    } catch (error) {
      console.log(error);
    }
  },
};
