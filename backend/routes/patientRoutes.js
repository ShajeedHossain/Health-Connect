const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { addPatient } = require("../controllers/patientControllers");
const { addAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.route("/update-patient").put(requireAuth, addPatient);
router.route("/add-appointment").post(requireAuth, addAppointment);

module.exports = router;
