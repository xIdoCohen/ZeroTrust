const adminLogger = require("./adminLogger");
const errorLogger = require("./errorLogger");
const authLogger = require("./authLogger");
const requestLogger = require("./requestLogger");
const securityLogger = require("./securityLogger");
const emailLogger = require("./emailLogger");

module.exports = {
  adminLogger,
  errorLogger,
  authLogger,
  requestLogger,
  securityLogger,
  emailLogger
};
