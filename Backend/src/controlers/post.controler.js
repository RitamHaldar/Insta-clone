const postmodel = require("../models/posts.model");
const jwt = require("jsonwebtoken");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imagekit = new Imagekit({
    privateKey: process.env.IMAGE_KIT_KEY
})
async function postcreatecontroler(req, res) {

    const token = req.cookies.Jwttoken;
    let decodeddata = null;
    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    try {
        decodeddata = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return res.status(401).json({
            message: "User not Authorized"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "Instagram-clone-project"
    })

    const post = await postmodel.create({
        caption: req.body.caption,
        imageurl: file.url,
        user: decodeddata.id
    })
    res.status(201).json({
        message: "Post created Successfully",
        post
    })
}

module.exports = {
    postcreatecontroler
}