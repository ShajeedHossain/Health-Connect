const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  doctorUpcomingAppointments,
  doctorPreviousAppointments,
} = require("../controllers/appointmentControllers");

const { updateDoctor } = require("../controllers/doctorControllers");

const router = express.Router();

router
  .route("/get-upcoming-appointments")
  .get(requireAuth, doctorUpcomingAppointments);
router
  .route("/get-previous-appointments")
  .get(requireAuth, doctorPreviousAppointments);
router.route("/update-doctor").put(requireAuth, updateDoctor);

module.exports = router;
