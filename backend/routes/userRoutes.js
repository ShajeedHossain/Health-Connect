const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  checkLogin,
  getUser,
  checkSignup,
  getSignup,
  checkEmail,
  updatePassword,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/login").post(checkLogin);
router.route("/").get(requireAuth, getUser);
router.route("/signup").post(checkSignup);
router.route("/forgot-password").post(checkEmail);
router.route("/reset-password/:id/:token").post(updatePassword);

module.exports = router;
