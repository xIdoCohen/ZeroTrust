const { createLogger, format, transports } = require("winston");
const path = require("path");

// Winston logger for HTTP/HTTPS requests
const requestLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) =>
      `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/requests.log"),
      level: "info"
    })
  ]
});

module.exports = requestLogger;