const mongoose = require("mongoose");
const followerschema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'Follower is required']
    },
    folowee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Folowee is required"]
    }
}, {
    timestamps: true
})
const followermodel = mongoose.model("followers", followerschema);
module.exports = followermodel;