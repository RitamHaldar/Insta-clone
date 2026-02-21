const mongoose = require("mongoose");
const followerschema = new mongoose.Schema({
    follower: {
        type: String,
        ref: "users",
        required: [true, 'Follower is required']
    },
    followee: {
        type: String,
        ref: "users",
        required: [true, "Followee is required"]
    },
    status: {
        type: String,
        default: "Pending",
        enum: {
            values: ["Pending", "Following", "Rejected"],
            message: "status can only be pending, accepted or rejected"
        }
    }
}, {
    timestamps: true
})
followerschema.index({ follower: 1, followee: 1 }, { unique: true });
const followermodel = mongoose.model("followers", followerschema);
module.exports = followermodel;