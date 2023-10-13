const express = require("express");
// const requireAuth = require("../middlewares/requireAuth");

const { createDoctorSignup } = require("../controllers/adminControllers");
const { addHospital } = require("../controllers/hospitalControllers");
const {
  findPreviousReservations,
  findUpcomingReservations,
} = require("../controllers/reservationControllers");

const router = express.Router();

router.route("/add-one-doctor").post(createDoctorSignup);
router.route("/add-hospital").post(addHospital);
router.route("/get-previous-reservations").get(findPreviousReservations);
router.route("/get-upcoming-reservations").get(findUpcomingReservations);

module.exports = router;
