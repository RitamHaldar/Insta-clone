const jwt = require("jsonwebtoken");
async function identifyuser(req, res, next) {
    const token = req.cookies.Jwttoken;
    let decodeddata = null;
    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    try {
        decodeddata = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return res.status(401).json({
            message: "User not Authorized"
        })
    }
    req.user = decodeddata;
    next();
}
module.exports = identifyuser;