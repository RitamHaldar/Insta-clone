const express = require('express');
const app = express();
const cookieparser= require("cookie-parser");
const authroute= require("./routes/auth.routes");
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth",authroute);
// JSON parse error handler
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return res.status(400).json({ error: 'Invalid JSON payload' });
	}
	next(err);
});

module.exports = app;