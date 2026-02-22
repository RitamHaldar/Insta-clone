const express = require("express");
const authroute = express.Router();
const routecontrolers = require("../controlers/auth.controler");
const identifyuser = require("../middlewares/post.middleware")
authroute.post("/register", routecontrolers.registercontroler);
authroute.post("/login", routecontrolers.logincontroler);
authroute.get("/get-me", identifyuser, routecontrolers.getme);
module.exports = authroute;