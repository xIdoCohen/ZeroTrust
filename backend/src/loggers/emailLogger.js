const { createLogger, format, transports } = require("winston");
const path = require("path");

const emailLogger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) =>
      `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/emails.log")
    })
  ]
});

module.exports = emailLogger;
