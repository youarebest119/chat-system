const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");

exports.authentication = catchAsyncErrors(async (req, res, next) => {
    let token = req.cookies.token;
    let { id } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({
        _id: id,
    })
    req.user = user;
    next();
})