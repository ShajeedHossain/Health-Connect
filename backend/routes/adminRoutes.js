const express = require("express");
// const requireAuth = require("../middlewares/requireAuth");

const { createDoctorSignup } = require("../controllers/adminControllers");
const {
  addToAppointmentList,
  getAllAppointments,
} = require("../controllers/appointmentControllers");

const { addHospital } = require("../controllers/hospitalControllers");

const router = express.Router();

router.route("/add-one-doctor").post(createDoctorSignup);
router.route("/add-one-appointment").post(addToAppointmentList);
router.route("/add-hospital").post(addHospital);
// router.route("/get-all-appointment").get(getAllAppointments);

module.exports = router;
