const express = require("express");
// const requireAuth = require("../middlewares/requireAuth");

const { createDoctorSignup } = require("../controllers/adminControllers");
const {
  addToAppointmentList,
  getAllAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.route("/add-one-doctor").post(createDoctorSignup);
router.route("/add-one-appointment").post(addToAppointmentList);
router.route("/get-all-appointment").get(getAllAppointments);

module.exports = router;
