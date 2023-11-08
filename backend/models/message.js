const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.ObjectId,
        required: true,
    },
    receiver: {
        type: mongoose.ObjectId,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("message", messageSchema);