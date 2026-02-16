const express=require("express");
const authroute=express.Router();
const usermodel= require("../models/user.model");
const crypto=require("crypto");
authroute.post("/register", async (req,res)=>{
    const {username,email,password,bio,profileimage}=req.body;
    const UserAlreadyexists= await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(UserAlreadyexists){
        return res.status(409).json({
            message:"User already exists with this "+(UserAlreadyexists.email==email? "email":"username")
        })
    }
    const hashpass= crypto.createHash("sha256").update(password).digest("hex");
    const user= await usermodel.create({
        username,
        email,
        password: hashpass,
        bio,
        profileimage
    })
    res.status(201).json({
        message:"user created sucessfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileimage:user.profileimage
        }
    })
})

module.exports=authroute;