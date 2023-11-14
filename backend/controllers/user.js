const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Message = require("../models/message");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandlers");
const { sendToken } = require("../utils/sendToken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.registerUser = catchAsyncErrors(async (req, res) => {
    let newUser = new User({
        ...req.body,
        profilePic: {
            url: process.env.AVATAR_URL,
        }
    });
    await newUser.save();
    setTimeout(() => {
        res.status(200).json({
            success: true,
            data: newUser,
            message: "user registered",
        })
    }, process.env.LAZY_TIME);
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
    let user = await User.findOne({ _id: req.user._id }).select("-password");
    setTimeout(() => {
        res.status(200).json({
            success: true,
            data: user,
            message: "user fetched",
        })
    }, process.env.LAZY_TIME);
})

exports.getInboxUsers = catchAsyncErrors(async (req, res, next) => {
    let query = {};
    if (req.query.search) {
        query = { ...query, username: { $regex: new RegExp(req.query.search) } }
    };
    if (req.query.id) {
        query = { ...query, _id: req.query.id };
    }
    const { page } = req.query;
    // let users = await User.find({ _id: { $ne: req.user._id }, ...query }).select("-password").limit(process.env.USERS_PER_PAGE).skip((page - 1) * process.env.USERS_PER_PAGE);
    const totalUsers = await User.find().select("-password");

    // let users = await User.aggregate([
    //     {
    //         $lookup:
    //         {
    //             from: "messages",
    //             localField: "_id",
    //             foreignField: "sender",
    //             as: "message",
    //         },
    //     },
    //     {
    //         $project: {
    //             "password": 0,
    //         }
    //     },
    //     { $match: { "message": { $ne: [] }, "_id": { $ne: req.user._id } } },
    //     { $sort: { "message.createdAt": -1 } },
    //     { $limit: Number(process.env.USERS_PER_PAGE) },
    //     { $skip: (page - 1) * Number(process.env.USERS_PER_PAGE) }
    // ]);
    let users = await User.aggregate([
        {
            $match: {
                _id: req?.user?._id
            }
        },
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "sender",
                as: "message",
            }
        },
    ]);

    // let users = await User.aggregate([
    //     {
    //          {
    //         $match: {
    //             title: { $regex: /example/ }
    //         }
    //     }
    //         $lookup: {
    //             from: "messages",
    //             localField: "_id",
    //             foreignField: "sender",
    //             as: "message",
    //         }
    //         $
    //     },
    //     {
    //         $match: {
    //             "message": {
    //                 $ne: [],
    //             }
    //         }
    //     },
    // {
    //     $unwind: "$message"
    // },
    // {
    //     $match: {
    //         "message.sender": {
    //             "$in": [new ObjectId("$_id"), req.user._id]
    //         },
    //         "message.receiver": {
    //             "$in": [new ObjectId("$_id"), req.user._id]
    //         },
    //     }
    // },
    // { $sort: { "message.updatedAt": -1 } },
    // {
    //     $group: {
    //         _id: "username",
    //         names: {
    //             $push: "$$ROOT"
    //         }
    //     }
    // }
    // ])
    // setTimeout(() => {
    res.status(200).json({
        success: true,
        data: users,
        fetched: users.length,
        total: totalUsers.length,
        message: "users fetched",
        page: page,
    });
    // }, process.env.LAZY_TIME);
});



exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    let query = {};
    if (req.query.search) {
        query = { ...query, username: { $regex: new RegExp(req.query.search) } }
    };
    if (req.query.id) {
        query = { ...query, _id: req.query.id };
    }
    const { page } = req.query;
    // let users = await User.find({ _id: { $ne: req.user._id }, ...query }).select("-password").limit(process.env.USERS_PER_PAGE).skip((page - 1) * process.env.USERS_PER_PAGE);
    const totalUsers = await User.find().select("-password");
    const pagination = [
        { $limit: Number(process.env.USERS_PER_PAGE) },
        { $skip: (page - 1) * Number(process.env.USERS_PER_PAGE) },
    ]
    let users = await User.aggregate([
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "sender",
                as: "message",
            },
        },
        {
            $match: {
                "message": { $eq: [] },
                "_id": { $ne: req.user._id },
                ...(req.query.search ? { "username": new RegExp(req.query.search) } : {}),
                ...(req.query.id ? { "_id": new ObjectId(req.query.id) } : {}),
            }
        },
        { $sort: { "message.createdAt": -1 } },
        ...(page ? pagination : []),
        {
            $project: {
                "password": 0,
                "message": 0,
            }
        },
    ]);

    setTimeout(() => {
        res.status(200).json({
            success: true,
            data: users,
            fetched: users.length,
            total: totalUsers.length - 1,
            message: "users fetched",
            page: page,
        });
    }, process.env.LAZY_TIME);
});


// db.students.aggregate([
//     {
//         $project: {
//             s
//         }
//     }
// ])