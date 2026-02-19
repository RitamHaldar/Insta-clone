const express = require("express");
const authroute = express.Router();
const routecontrolers = require("../controlers/auth.controler");
authroute.post("/register", routecontrolers.registercontroler)
authroute.post("/login", routecontrolers.logincontroler)
module.exports = authroute;