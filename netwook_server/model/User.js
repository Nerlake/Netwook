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
        default: "https://cdn-icons-png.flaticon.com/512/21/21104.png",
    },
    coverPicture: {
        type: String,
        default: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg",
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