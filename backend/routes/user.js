const express = require("express");
const { registerUser, loginUser, getUserDetails, searchUsers } = require("../controllers/user");
const { authentication } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user").get(authentication, getUserDetails);
router.route("/users").get(authentication, searchUsers);


module.exports = router;