const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/AdminControllers");

router.post("/seed", adminControllers.post);
router.post("/login", adminControllers.verifyLogin);
router.put("/ban/:id", adminControllers.banUser);
router.put("/ban/sp/:id", adminControllers.banSp);
router.put("/sp/unban/:id", adminControllers.unbanSp);
router.put("/unban/:id", adminControllers.unbanUser);
router.put("/verify/:id", adminControllers.verifyAccount);
router.put("/decline/:id", adminControllers.declineAccount)

module.exports = router;
