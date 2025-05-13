const { createLogger, format, transports } = require("winston");
const path = require("path");

const errorLogger = createLogger({
  level: "error", 
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) =>
      `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/errors.log")
    })
  ]
});

module.exports = errorLogger;
