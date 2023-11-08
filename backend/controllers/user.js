const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandlers");
const { sendToken } = require("../utils/sendToken");

exports.registerUser = catchAsyncErrors(async (req, res) => {
    let newUser = new User({
        ...req.body,
        profilePic: {
            url: process.env.AVATAR_URL,
        }
    });
    await newUser.save();
    res.status(200).json({
        success: true,
        user: newUser,
    })
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username) {
        return next(new ErrorHandler("username is required", 400));
    }
    if (!password) {
        return next(new ErrorHandler("password is required", 400));
    }

    let user = await User.findOne({ username }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    let isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, res);
})

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findOne({ _id: req.user._id });
    res.status(200).json({
        success: true,
        user,
    })
})

exports.searchUsers = catchAsyncErrors(async (req, res, next) => {
    let query = {};
    console.log('req.query', req.query);
    if (req.query.search) {
        query = { ...query, username: { $regex: new RegExp(req.query.search) } }
    };
    if (req.query.id) {
        query = { ...query, _id: req.query.id };
    }
    let users = await User.find({ _id: { $ne: req.user._id }, ...query }).select("-password");
    res.status(200).json({
        success: true,
        users,
    });
});