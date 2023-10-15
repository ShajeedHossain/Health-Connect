const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  updatePatient,
  getAllDoctor,
  getSortedDoctorList,
} = require("../controllers/patientControllers");
const {
  addAppointment,
  getPreviousAppointments,
  getUpcomingAppointments,
} = require("../controllers/appointmentControllers");
const { getAllHospital } = require("../controllers/hospitalControllers");
const {
  addReservation,
  patientPreviousReservations,
  patientUpcomingReservations,
} = require("../controllers/reservationControllers");

const router = express.Router();

router.route("/update-patient").put(requireAuth, updatePatient);
router.route("/add-appointment").post(requireAuth, addAppointment);
router.route("/add-reservation").post(requireAuth, addReservation);
router.route("/previous-appointment").get(requireAuth, getPreviousAppointments);
router.route("/upcoming-appointment").get(requireAuth, getUpcomingAppointments);
router.route("/get-all-hospital").get(requireAuth, getAllHospital);
router.route("/get-all-doctor").get(requireAuth, getAllDoctor);
router.route("/get-sorted-doctor").get(requireAuth, getSortedDoctorList);
router
  .route("/get-previous-reservation")
  .get(requireAuth, patientPreviousReservations);
router
  .route("/get-upcoming-reservation")
  .get(requireAuth, patientUpcomingReservations);

module.exports = router;
