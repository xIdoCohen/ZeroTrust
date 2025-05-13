const { createLogger, format, transports } = require("winston");
const path = require("path");

const securityLogger = createLogger({
  level: "warn", 
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) =>
      `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/security.log")
    })
  ]
});

module.exports = securityLogger;
