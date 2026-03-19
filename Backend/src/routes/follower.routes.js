const express = require("express");
const followRoute = express.Router();
const identifyuser = require("../middlewares/post.middleware");
const followercontroller = require("../controlers/follower.controler");
followRoute.post("/follow/:username", identifyuser, followercontroller.followercontrolerhandler);


followRoute.post("/unfollow/:username", identifyuser, followercontroller.followerdeletehandler);

followRoute.get("/follow/pending", identifyuser, followercontroller.followerpendingrecordscontrolerhandler);
followRoute.get("/follow/outgoing", identifyuser, followercontroller.followeroutgoingrecordscontrolerhandler);

followRoute.post("/follow/approve/:followid", identifyuser, followercontroller.followeracceptcontrolerhandler);

followRoute.post("/follow/reject/:followid", identifyuser, followercontroller.followerrejectcontrolerhandler);
module.exports = followRoute;