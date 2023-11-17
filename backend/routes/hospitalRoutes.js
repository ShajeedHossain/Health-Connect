const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  createDoctorSignup,
  getHospitalDoctors,
  addManyDoctor,
  getHospital,
  createPatientAccount,
  updateHospital,
} = require("../controllers/hospitalControllers");
const {
  findPreviousReservations,
  findUpcomingReservations,
  dischargePatient,
  getHospitalReservations,
} = require("../controllers/reservationControllers");

const router = express.Router();

router.route("/add-one-doctor").post(requireAuth, createDoctorSignup);
router
  .route("/get-previous-reservations")
  .get(requireAuth, findPreviousReservations);
router
  .route("/get-upcoming-reservations")
  .get(requireAuth, findUpcomingReservations);
router.route("/get-doctors").get(requireAuth, getHospitalDoctors);
router.route("/add-many-doctor").post(requireAuth, addManyDoctor);
router.route("/get-hospital").post(requireAuth, getHospital);
router.route("/discharge-patient").put(requireAuth, dischargePatient);
router.route("/update-hospital").put(requireAuth, updateHospital);
router
  .route("/get-hospital-reservations")
  .get(requireAuth, getHospitalReservations);
router.route("/create-patient-account").post(requireAuth, createPatientAccount);

module.exports = router;
