const express = require('express');
const app = express();
const cookieparser = require("cookie-parser");
const authroute = require("./routes/auth.routes");
const postroute = require("./routes/post.routes");
const followroute = require("./routes/follower.routes");
const cors = require("cors")
app.use(cookieparser());
app.use(express.json());
app.use(cors());
app.use("/api/auth", authroute);
app.use("/api/post", postroute);
app.use("/api/users", followroute);
module.exports = app;