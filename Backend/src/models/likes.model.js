const mongoose = require("mongoose");

const likesschema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: [true, "Post is required"]
    },
    user: {
        type: String,
        required: [true, "User is required"]
    }
}, {
    timestamps: true
})

const likesmodel = mongoose.model("Likes", likesschema);

module.exports = likesmodel;