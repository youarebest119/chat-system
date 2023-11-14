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
    setTimeout(() => {
        return res.status(200).json({
            success: true,
            message: "message sent",
            data: newMessage,
        });
    }, process.env.LAZY_TIME);
});

exports.getRecentChat = catchAsyncErrors(async (req, res, next) => {
    const receiver = req.params.id;
    const { page, sort } = req.query;
    const query = { $or: [{ sender: receiver, receiver: req.user._id }, { receiver, sender: req.user._id }] };
    if (!receiver) {
        return next(new ErrorHandler("receiver is required", 400));
    }
    const messages = await Message.find(query)
        .sort({ "createdAt": sort === "asc" ? -1 : 1 })
        .skip((page - 1) * process.env.MESSAGES_PER_PAGE)
        .limit(process.env.MESSAGES_PER_PAGE);
    let totalCount = await Message.find(query)
    totalCount = totalCount.length;
    setTimeout(() => {
        return res.status(200).json({
            success: true,
            data: messages,
            message: "chat fetched",
            total: totalCount,
        });
    }, process.env.LAZY_TIME);
});

exports.readMsg = catchAsyncErrors(async (req, res, next) => {
    const messageId = req.params.id;
    const query = { _id: messageId, sender: req.user._id };
    if (!messageId) {
        return next(new ErrorHandler("messageId is required", 400));
    }
    const response = await Message.updateOne(query, { $set: { isRead: true } });
    setTimeout(() => {
        return res.status(200).json({
            success: true,
            data: response,
            message: "message read",
        });
    }, process.env.LAZY_TIME);
});

exports.readChat = catchAsyncErrors(async (req, res, next) => {
    const receiver = req.params.id;
    const query = { $or: [{ sender: receiver, receiver: req.user._id }, { receiver, sender: req.user._id }] };
    if (!receiver) {
        return next(new ErrorHandler("receiver is required", 400));
    }
    const response = await Message.updateMany(query, { $set: { isRead: true } });
    setTimeout(() => {
        return res.status(200).json({
            success: true,
            data: response,
            message: "chat read",
        });
    }, process.env.LAZY_TIME);
});

exports.deleteMsg = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const query = { _id: id, sender: req.user._id };
    const deletedMsg = await Message.deleteOne(query);
    setTimeout(() => {
        return res.status(200).json({
            success: true,
            data: deletedMsg,
            message: "message deleted",
        })
    }, process.env.LAZY_TIME);
});

exports.getMsg = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const query = { _id: id, sender: req.user._id };
    const message = await Message.find(query);
    setTimeout(() => {
        return res.status(200).json({
            success: true,
            data: message,
            message: "message fetched",
        })
    }, process.env.LAZY_TIME);
});