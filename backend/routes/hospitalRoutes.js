const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  createDoctorSignup,
  getHospitalDoctors,
} = require("../controllers/hospitalControllers");
const {
  findPreviousReservations,
  findUpcomingReservations,
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

module.exports = router;
