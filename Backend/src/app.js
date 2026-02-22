const express = require('express');
const cors = require("cors")
const app = express();
const cookieparser = require("cookie-parser");
const authroute = require("./routes/auth.routes");
const postroute = require("./routes/post.routes");
const followroute = require("./routes/follower.routes");
app.use(cookieparser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use("/api/auth", authroute);
app.use("/api/post", postroute);
app.use("/api/users", followroute);
module.exports = app;