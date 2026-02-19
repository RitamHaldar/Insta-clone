const express = require("express");
const postrouter = express.Router();
const postcontrolers = require("../controlers/post.controler");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
postrouter.post("/", upload.single("test"), postcontrolers.postcreatecontroler);
module.exports = postrouter;