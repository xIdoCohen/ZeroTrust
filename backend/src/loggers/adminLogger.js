// src/logger.js
const { createLogger, transports, format } = require("winston");
const path = require("path");

const adminLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, "../../logs/admin-actions.log") })
  ]
});


module.exports = adminLogger;
