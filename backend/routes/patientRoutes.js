const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  addPatient,
  getAllDoctor,
  getSortedDoctorList,
} = require("../controllers/patientControllers");
const {
  addAppointment,
  getPreviousAppointments,
  getUpcomingAppointments,
} = require("../controllers/appointmentControllers");
const { getAllHospital } = require("../controllers/hospitalControllers");
const { addReservation } = require("../controllers/reservationControllers");

const router = express.Router();

router.route("/update-patient").put(requireAuth, addPatient);
router.route("/add-appointment").post(requireAuth, addAppointment);
router.route("/add-reservation").post(requireAuth, addReservation);
router.route("/previous-appointment").get(requireAuth, getPreviousAppointments);
router.route("/upcoming-appointment").get(requireAuth, getUpcomingAppointments);
router.route("/get-all-hospital").get(requireAuth, getAllHospital);
router.route("/get-all-doctor").get(requireAuth, getAllDoctor);
router.route("/get-sorted-doctor").get(requireAuth, getSortedDoctorList);

module.exports = router;
