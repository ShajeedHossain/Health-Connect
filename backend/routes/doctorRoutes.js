const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  doctorUpcomingAppointments,
  doctorPreviousAppointments,
  getDoctorAllAppointment,
  appointmentDone,
} = require("../controllers/appointmentControllers");

const { updateDoctor, getDoctor } = require("../controllers/doctorControllers");

const router = express.Router();

router
  .route("/get-upcoming-appointments")
  .get(requireAuth, doctorUpcomingAppointments);
router
  .route("/get-previous-appointments")
  .get(requireAuth, doctorPreviousAppointments);
router.route("/update-doctor").put(requireAuth, updateDoctor);
router.route("/get-doctor").get(requireAuth, getDoctor);
router
  .route("/get-doctor-appointments")
  .get(requireAuth, getDoctorAllAppointment);
router.route("/appointment-done").put(requireAuth, appointmentDone);

module.exports = router;
