// src/middlewares/auth.js
const jwt = require("jsonwebtoken");
const { authLogger, securityLogger}= require("../loggers/LoggerManager");
const SECRET = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    authLogger.warn(`Unauthenticated request (no token) from ${req.ip}`);
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      authLogger.warn(`Invalid token from ${req.ip}`);
      securityLogger.warn(`Invalid token from ${req.ip}`);
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user; // ✅ user is now decoded from JWT
    authLogger.info(`Authenticated user: ${user.username} from ${req.ip}`);
    next();
  });
}

module.exports = {  authenticateJWT };
