const express = require('express');
const app = express();
const cookieparser= require("cookie-parser");
const authroute= require("./routes/auth.routes");
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth",authroute);
module.exports = app;