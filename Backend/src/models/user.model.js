const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User Already exists with this username"],
        required: [true, "Please provide an username"]
    },
    email: {
        type: String,
        unique: [true, "User Already exists with this email"],
        required: [true, "Please provide an email"]
    },
    password: {
        type: String,
        required: [true, "Please provide an password"]
    },
    bio: {
        type: String
    },
    profileimage: {
        type: String,
        default: ""
    }
})
const usermodel = mongoose.model("Users", userschema);
module.exports = usermodel;