const express = require("express");
const router = express.Router();

const liveMessagesController = require("../controllers/LiveMessagesController.js");

router.get("/", liveMessagesController.getAllMessages);
module.exports = router;
router.post("/sendMessage", liveMessagesController.sendMessage);
router.get("/:spId/:userId");
