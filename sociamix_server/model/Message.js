const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    recipientId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        max: 500,
        required: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema)