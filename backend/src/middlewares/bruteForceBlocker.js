// src/middlewares/bruteForceBlocker.js
const rateLimit = require("express-rate-limit");
const { securityLogger } = require("../loggers/LoggerManager");

const bruteForceBlocker = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50, 
  message: { message: "Too many login attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    const ip = req.ip || req.connection.remoteAddress;
    securityLogger.warn(`Brute force attempt detected from IP: ${ip}`);    
    res.status(options.statusCode).json(options.message);
  }
},);

module.exports = bruteForceBlocker;
