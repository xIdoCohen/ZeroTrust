// src/middlewares/requestLogger.js
const {requestLogger} = require("../loggers/LoggerManager");

function logRequest(req, res, next) {
  const user =
    req.user?.username ||                     
    req.body?.username ||                     
    req.query?.username ||                    
    req.username ||                           
    "unauthenticated";

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown";

  const { method, originalUrl } = req;

  res.on("finish", () => {
    requestLogger.info(
      `[${user}] ${res.statusCode} ${method} ${originalUrl} from ${ip}`
    );
  });
  
  next();
}

module.exports = logRequest;
