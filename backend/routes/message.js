const express = require("express");
const { authentication } = require("../middlewares/auth");
const { initiateChat, getRecentChat, readChat, readMsg, deleteMsg, getMsg } = require("../controllers/message");

const router = express.Router();
router.route("/initiate").post(authentication, initiateChat);
router.route("/:id").get(authentication, getRecentChat)
router.route("/chat/:id").put(authentication, readChat);
router.route("/message/:id")
    .get(authentication, getMsg)
    .put(authentication, readMsg)
    .delete(authentication, deleteMsg)

module.exports = router;