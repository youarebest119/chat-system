const express = require("express");
const { registerUser, loginUser, getUserDetails, getInboxUsers, allUsers } = require("../controllers/user");
const { authentication } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user").get(authentication, getUserDetails);
router.route("/inbox").get(authentication, getInboxUsers);
router.route("/users").get(authentication, allUsers)


module.exports = router;