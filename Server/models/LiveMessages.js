const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    messageBody: { type: String, required: true },
    userId: { type: String, required: true },
    spId: { type: String, required: true },
    isSp: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const liveMessages = mongoose.model("liveMessages", messageSchema);

module.exports = liveMessages;
