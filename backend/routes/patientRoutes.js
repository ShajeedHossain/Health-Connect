const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  addPatient,
  getAllDoctor,
} = require("../controllers/patientControllers");
const {
  addAppointment,
  getPreviousAppointments,
  getUpcomingAppointments,
} = require("../controllers/appointmentControllers");
const { getAllHospital } = require("../controllers/hospitalControllers");

const router = express.Router();

router.route("/update-patient").put(requireAuth, addPatient);
router.route("/add-appointment").post(requireAuth, addAppointment);
router.route("/previous-appointment").get(requireAuth, getPreviousAppointments);
router.route("/upcoming-appointment").get(requireAuth, getUpcomingAppointments);
router.route("/get-all-hospital").get(requireAuth, getAllHospital);
router.route("/get-all-doctor").get(requireAuth, getAllDoctor);

module.exports = router;
