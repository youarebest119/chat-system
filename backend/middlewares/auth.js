const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandlers");

exports.authentication = catchAsyncErrors(async (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        token = req.headers.auth;
    }
    let { id } = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({
        _id: id,
    })
    req.user = user;
    next();
})