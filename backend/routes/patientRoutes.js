const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  updatePatient,
  // getAllDoctor,
  // getSortedDoctorList,
  getPatient,
  receiveMapUrl,
  getSortedDoctorData,
  getSortedHospitalData,
} = require("../controllers/patientControllers");
const {
  addAppointment,
  getPreviousAppointments,
  getUpcomingAppointments,
  getPatientAllAppointment,
} = require("../controllers/appointmentControllers");
const { getAllHospital } = require("../controllers/hospitalControllers");
const {
  addReservation,
  patientPreviousReservations,
  patientUpcomingReservations,
  getPatientReservations,
} = require("../controllers/reservationControllers");

const router = express.Router();

router.route("/update-patient").put(requireAuth, updatePatient);
router.route("/add-appointment").post(requireAuth, addAppointment);
router.route("/add-reservation").post(requireAuth, addReservation);
router.route("/previous-appointment").get(requireAuth, getPreviousAppointments);
router.route("/upcoming-appointment").get(requireAuth, getUpcomingAppointments);
router
  .route("/get-patient-appointments")
  .post(requireAuth, getPatientAllAppointment);
router.route("/get-all-hospital").get(requireAuth, getAllHospital);
// router.route("/get-all-doctor").get(requireAuth, getAllDoctor);
// router.route("/get-sorted-doctor").get(requireAuth, getSortedDoctorList);
router.route("/get-sorted-doctor-data").post(requireAuth, getSortedDoctorData);
router
  .route("/get-sorted-hospital-data")
  .post(requireAuth, getSortedHospitalData);
router
  .route("/get-previous-reservation")
  .get(requireAuth, patientPreviousReservations);
router
  .route("/get-upcoming-reservation")
  .get(requireAuth, patientUpcomingReservations);
router.route("/get-all-reservations").get(requireAuth, getPatientReservations);
router.route("/get-patient").post(requireAuth, getPatient);
router.route("/get-distance").post(requireAuth, receiveMapUrl);

module.exports = router;
