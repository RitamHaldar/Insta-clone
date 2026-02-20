const postmodel = require("../models/posts.model");
const jwt = require("jsonwebtoken");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imagekit = new Imagekit({
    privateKey: process.env.IMAGE_KIT_KEY
})
async function postcreatecontroler(req, res) {



    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "Instagram-clone-project"
    })

    const post = await postmodel.create({
        caption: req.body.caption,
        imageurl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: "Post created Successfully",
        post
    })
}
async function getpostscontroler(req, res) {
    const userid = req.user.id;
    const posts = await postmodel.find({
        user: userid
    })
    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}
async function getpstdetailscontroler(req, res) {

    const postId = req.params.postId;
    const post = await postmodel.findById(postId);
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const validuser = req.user.id === post.user.toString();
    if (!validuser) {
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }
    res.status(200).json({
        message: "Post Fetched Successfully",
        post
    })
}
module.exports = {
    postcreatecontroler,
    getpostscontroler,
    getpstdetailscontroler
}