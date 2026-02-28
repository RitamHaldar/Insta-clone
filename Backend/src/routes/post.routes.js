const express = require("express");
const postrouter = express.Router();
const postcontrolers = require("../controlers/post.controler");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyuser = require("../middlewares/post.middleware");
postrouter.post("/", upload.single("test"), identifyuser, postcontrolers.postcreatecontroler);
postrouter.get("/", identifyuser, postcontrolers.getpostscontroler);
postrouter.get("/details/:postId", identifyuser, postcontrolers.getpstdetailscontroler);
postrouter.post("/:postId", identifyuser, postcontrolers.postlikescontroller);
postrouter.get("/get-feed", identifyuser, postcontrolers.getfeedcontroller)
module.exports = postrouter;