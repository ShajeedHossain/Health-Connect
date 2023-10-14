const express = require("express");
// const requireAuth = require("../middlewares/requireAuth");

const { addHospital } = require("../controllers/hospitalControllers");

const router = express.Router();

router.route("/add-hospital").post(addHospital);

module.exports = router;
