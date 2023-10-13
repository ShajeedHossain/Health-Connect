const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  doctorUpcomingAppointments,
  doctorPreviousAppointments,
} = require("../controllers/appointmentControllers");

const router = express.Router();

router
  .route("/get-upcoming-appointments")
  .get(requireAuth, doctorUpcomingAppointments);
router
  .route("/get-previous-appointments")
  .get(requireAuth, doctorPreviousAppointments);

module.exports = router;
