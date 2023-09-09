const express = require("express");
// const requireAuth = require("../middlewares/requireAuth");

const { createDoctorSignup } = require("../controllers/adminControllers");

const router = express.Router();

router.route("/add-one-doctor").post(createDoctorSignup);

module.exports = router;
