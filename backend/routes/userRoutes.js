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

const {
  createConversation,
  getConversations,
  sendMessage,
  getMessages,
} = require("../controllers/conversationControllers");

const router = express.Router();

router.route("/login").post(checkLogin);
router.route("/").get(requireAuth, getUser);
router.route("/signup").post(checkSignup);
router.route("/forgot-password").post(checkEmail);
router.route("/reset-password/:id/:token").post(updatePassword);
//conversation routes
router.route("/conversation").post(requireAuth, createConversation);
router.route("/conversations/:userId").get(requireAuth, getConversations);
router.route("/message").post(requireAuth, sendMessage);
router.route("/message/:conversationId").get(requireAuth, getMessages);

module.exports = router;
