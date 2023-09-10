const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { addPatient } = require("../controllers/patientControllers");
const {
  addAppointment,
  getPreviousAppointments,
  getUpcomingAppointments,
  getAllAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.route("/update-patient").put(requireAuth, addPatient);
router.route("/add-appointment").post(requireAuth, addAppointment);
router.route("/previous-appointment").get(requireAuth, getPreviousAppointments);
router.route("/upcoming-appointment").get(requireAuth, getUpcomingAppointments);
router.route("/get-all-appointment").get(requireAuth, getAllAppointments);

module.exports = router;
