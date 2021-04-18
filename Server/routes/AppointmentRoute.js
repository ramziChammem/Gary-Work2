const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/AppointmentController");

router.post("/", appointmentController.makeAppointment);
router.get("/:name", appointmentController.getAll);
router.get("/getUserApts/:id", appointmentController.getUserApts);
router.delete("/:id", appointmentController.deleteAppointment);
router.put("/approve/:id", appointmentController.approveApp);
router.put("/decline/:id", appointmentController.declineApp);
router.delete("/cancel/:id", appointmentController.cancelApp);
module.exports = router;
