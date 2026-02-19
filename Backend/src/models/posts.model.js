const mongoose = require("mongoose");
const postschema = new mongoose.Schema({
    caption: {
        type: String,
        required: [true, "Please provide a caption"]
    },
    imageurl: {
        type: String,
        required: [true, "Please provide an image url"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Please provide an valid user"]
    }
})
const postmodel = mongoose.model("Posts", postschema);
module.exports = postmodel;