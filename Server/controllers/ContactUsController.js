const AdminMessages = require("../models/AdminMessages.js");

const ContactMessage = {
  AddMessage: async (req, res) => {
    try {
      let { name, phone, email, message } = req.body;
      const newMessage = new AdminMessages({
        name,
        phone,
        email,
        message,
      });

      await newMessage.save();
      res.send("Message Sent");
    } catch (err) {
      console.log(err);
    }
  },

  GetMessages: async (req, res) => {
    try {
      let messages = await AdminMessages.find({});
      res.send(messages);
    } catch (err) {
      res.send(err);
    }
  },

  DeleteMessage: async (req, res) => {
    try {
      let deleted = await AdminMessages.deleteOne({ _id: req.params.id });
      res.send(deleted);
    } catch (err) {
      console.log(err);
    }
  },

  DeleteAll: async (req, res) => {
    try {
      await AdminMessages.deleteMany({});
      res.json("deleted");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = ContactMessage;
