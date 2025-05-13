const {errorLogger}=require("../loggers/LoggerManager")
const axios = require("axios");

const secret=process.env.reCaptcha_SECRET
async function verifyCaptcha(token, ip) {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret: secret, 
        response: token,
        remoteip: ip,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return response.data.success;
  } catch (err) {
    errorLogger.error(`CAPTCHA verification failed: ${err.message}`);
    return false;
  }
}

module.exports = {
  verifyCaptcha,
};