const express = require("express");
// const requireAuth = require("../middlewares/requireAuth");

const { createDoctorSignup } = require("../controllers/adminControllers");
const { addHospital } = require("../controllers/hospitalControllers");

const router = express.Router();

router.route("/add-one-doctor").post(createDoctorSignup);
router.route("/add-hospital").post(addHospital);

module.exports = router;
