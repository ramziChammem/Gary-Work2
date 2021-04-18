const Reviews = require("../models/review");

const review = {
  addReview: async (req, res) => {
    try {
      const {
        serviceProviderEmail,
        userName,
        userId,
        reviewTitle,
        reviewBody,
        rate,
      } = req.body;
      const newReview = new Reviews({
        serviceProviderEmail,
        userName,
        userId,
        reviewTitle,
        reviewBody,
        rate,
      });
      await newReview.save();
      res.send(newReview);
    } catch (error) {
      console.log(error);
    }
  },
  allReviews: async (req, res) => {
    try {
      const reviews = await Reviews.find({
        serviceProviderEmail: req.params.spMail,
      });
      res.send(reviews);
    } catch (error) {
      console.log(error);
    }
  },
  oneReview: async (req, res) => {
    try {
      const reviews = await Reviews.find({ serviceProviderName: "halim" });
      res.send(reviews);
    } catch (error) {
      console.log(error);
    }
  },
  deleteReview: async (req, res) => {
    try {
      const deleteRev = await Reviews.findOneAndDelete({
        _id: req.params.id,
      });
      res.send(deleteRev);
    } catch (err) {
      console.log("deleting review error ==>", err);
    }
  },
};

module.exports = review;
