const messagesModel = require("../models/LiveMessages.js");

const liveMessages = {
  getAllMessages: async (req, res) => {
    try {
      let messages = await messagesModel.find({});
      res.send(messages);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  sendMessage: async (req, res) => {
    try {
      const newMessageSent = new messagesModel(req.body);
      await newMessageSent.save();
      res.send({ message: "Message sent!" });
    } catch (err) {
      console.log("error sent from sending private message ==>", err);
      res.send(err);
    }
  },
  getConversation: async (req, res) => {
    try {
      var data = await messagesModel.find({
        userId: req.params.userId,
        spId: req.params.spId,
      });
      res.send(data);
    } catch (err) {
      console.log("this error is because of live message", err);
    }
  },
};
module.exports = liveMessages;
