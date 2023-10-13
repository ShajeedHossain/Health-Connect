const express = require("express");
// const requireAuth = require("../middlewares/requireAuth");

const { addAdmin } = require("../controllers/devControllers");

const router = express.Router();

router.route("/add-admin").post(addAdmin);

module.exports = router;
