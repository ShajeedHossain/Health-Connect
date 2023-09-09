const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { addPatient } = require("../controllers/patientControllers");

const router = express.Router();

router.route("/update-patient").put(requireAuth, addPatient);

module.exports = router;
