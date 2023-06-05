const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    firstName: {
        type: String,
        require: true,
        max: 50,
    },
    name: {
        type: String,
        require: true,
        max: 50,
    },
    profilePicture: {
        type: String,
        default: "user.png",
    },
    coverPicture: {
        type: String,
        default: "1.jpeg",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    friends: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)