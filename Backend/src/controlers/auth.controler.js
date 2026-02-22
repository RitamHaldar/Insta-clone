const usermodel = require("../models/user.model");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function registercontroler(req, res) {
    const { username, email, password, bio, profileimage } = req.body;
    const UserAlreadyexists = await usermodel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (UserAlreadyexists) {
        return res.status(409).json({
            message: "User already exists with this " + (UserAlreadyexists.email == email ? "email" : "username")
        })
    }
    const hashpass = await bycript.hash(password, 10);
    const user = await usermodel.create({
        username,
        email,
        password: hashpass,
        bio,
        profileimage
    })
    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" })
    res.cookie("Jwttoken", token)
    res.status(201).json({
        message: "user created sucessfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileimage: user.profileimage
        }
    })
}
async function logincontroler(req, res) {
    const { username, email, password } = req.body;
    const UserAlreadyexists = await usermodel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (!UserAlreadyexists) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const passCorrect = await bycript.compare(password, UserAlreadyexists.password);
    if (!passCorrect) {
        return res.status(401).json({
            message: "Password incorrect"
        })
    }
    const token = jwt.sign({
        id: UserAlreadyexists._id,
        username: UserAlreadyexists.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" })
    res.cookie("Jwttoken", token)
    res.status(201).json({
        message: "User Loggedin Successfully",
        user: {
            id: UserAlreadyexists._id,
            username: UserAlreadyexists.username
        }
    })
}

async function getme(req, res) {
    const userid = req.user.id;
    const user = await usermodel.findById(userid);
    res.status(200).json({
        message: "user found successfully",
        user
    })
}

module.exports = {
    registercontroler,
    logincontroler,
    getme
}