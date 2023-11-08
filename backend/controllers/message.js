const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Message = require("../models/message");
const ErrorHandler = require("../utils/errorHandlers");

exports.initiateChat = catchAsyncErrors(async (req, res, next) => {
    const { receiver, message } = req.body;
    let newMessage = await Message.create({
        sender: req.user._id,
        receiver,
        message,
        isRead: false,
    });
    return res.status(200).json({
        success: true,
        message: newMessage,
    });
});

exports.getRecentChat = catchAsyncErrors(async (req, res, next) => {
    const receiver = req.params.id;
    const { page } = req.query;
    const query = { $or: [{ sender: receiver, receiver: req.user._id }, { receiver, sender: req.user._id }] };
    if (!receiver) {
        return next(new ErrorHandler("receiver is required", 400));
    }
    const messages = await Message.find(query)
        .sort({ "createdAt": -1 })
        .skip((page - 1) * process.env.MESSAGES_PER_PAGE)
        .limit(process.env.MESSAGES_PER_PAGE);
    let totalCount = await Message.find(query)
    totalCount = totalCount.length;
    return res.status(200).json({
        success: true,
        messages,
        total: totalCount,
    });
});

exports.readMsg = catchAsyncErrors(async (req, res, next) => {
    const messageId = req.params.id;
    const query = { _id: messageId };
    if (!messageId) {
        return next(new ErrorHandler("messageId is required", 400));
    }
    const response = await Message.updateOne(query, { $set: { isRead: true } });
    return res.status(200).json({
        success: true,
        response,
    });
});

exports.readChat = catchAsyncErrors(async (req, res, next) => {
    const receiver = req.params.id;
    const query = { $or: [{ sender: receiver, receiver: req.user._id }, { receiver, sender: req.user._id }] };
    if (!receiver) {
        return next(new ErrorHandler("receiver is required", 400));
    }
    const response = await Message.updateMany(query, { $set: { isRead: true } });
    return res.status(200).json({
        success: true,
        response,
    });
});

exports.deleteMsg = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const query = { _id: id };
    const deletedMsg = await Message.deleteOne(query);
    return res.status(200).json({
        success: true,
        deletedMsg,
    })
});

exports.getMsg = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const query = { _id: id };
    const message = await Message.find(query);
    return res.status(200).json({
        success: true,
        message,
    })
});