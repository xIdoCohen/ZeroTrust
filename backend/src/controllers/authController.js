const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authLogger,securityLogger,errorLogger, emailLogger} = require("../loggers/LoggerManager");
const sendOTPmail = require("../services/emailSender");
const {generateOTP, saveOTP,clearOTP, isVerified ,verifyOTPinput} = require("../services/OTP")
const { verifyCaptcha } = require("../services/reCaptcha");
const SECRET = process.env.JWT_SECRET;


function validateToken(req, res) { 
  console.log(req);
  const token = req.cookies.token;
  if (!token) {
    authLogger.warn(`Token validation failed: missing token from ${req.ip}`);
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      authLogger.warn(`Token validation failed: invalid token from ${req.ip}`);
      securityLogger.warn(`Token validation failed: invalid token from ${req.ip}`);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    return res.status(200).json({ message: "Token is valid", user });
  });
}

async function login(req, res) {
  const { username, password ,captchaToken} = req.body;

  if (!captchaToken) {
    authLogger.warn(`Login blocked: missing CAPTCHA token from ${req.ip}`);
    return res.status(400).json({ message: "CAPTCHA token is required." });
  }

  const captchaPassed = await verifyCaptcha(captchaToken, req.ip);
  if (!captchaPassed) {
    securityLogger.warn(`Login blocked: CAPTCHA failed for user ${username} from ${req.ip}`);
    return res.status(403).json({ message: "CAPTCHA verification failed." });
  }

  if (!username || !password) {
    authLogger.warn(`Login failed: missing username or password in request from ${req.ip}`);
    securityLogger.warn(`Login attempt: missing username or password in request from ${req.ip}`);
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = await User.findOne({ where: { username } });
  if (!user) {
    authLogger.warn(`Login failed: user ${username} not found in request from ${req.ip}`);
    securityLogger.warn(`Login attempt: user ${username} not found in request from ${req.ip}`);
    return res.status(401).json({ message: "Invalid credentials" }); 
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    securityLogger.warn(`Login attempt: invalid password for user ${username} in request from ${req.ip}`);
    authLogger.warn(`Login failed: invalid password for user ${username} in request from ${req.ip}`);
    return res.status(401).json({ message: "Invalid credentials" }); 
  }

  const otp =generateOTP();
  saveOTP(username, otp);
  await sendOTPmail(user.email, otp);
  emailLogger.info(`OTP sent to ${user.email} for user ${username} from ${req.ip}`);
  return res.status(200).json({ message: "OTP sent to your email" });
}

function verifyOTP(req, res) {
  const {username, otp} = req.body;
  if(verifyOTPinput(username, otp)){
    res.status(200).json({message:"OTP verified"});
  }else{
    res.status(401).json({message:"Invalid OTP"});
  }
}

async function generateToken(req,res) {//get Function
  const username  = req.query.username;
  if (!username) { 
    errorLogger.error(`Token generation failed: missing username in request from ${req.ip}`);
    return res.status(400).json({ message: "Username is required" });
  }
  
  const user = await User.findOne({ where: { username } });
  if ( !user ||!isVerified(user.username)) {
    authLogger.warn(`Token generation failed: user ${username} not found or OTP not verified in request from ${req.ip}`);
    securityLogger.warn(`Token generation attempt: user ${username} not found or OTP not verified in request from ${req.ip}`);
    return res.status(403).json({ message: "OTP not verified or missing email" });
  }
   const token=jwt.sign(
    {
      username: user.username,
      email: user.email,
      role: user.role,
      device: user.allowedDevice
    },
    SECRET,
    { expiresIn: "15m" }
  );
  clearOTP(user.username);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  return res.status(200).json({ message: "Token generated ", token });

}


async function resendOTP(req, res) {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = generateOTP();
  saveOTP(username, otp);
  await sendOTPmail(user.email, otp);
  emailLogger.info(`OTP resent to ${user.email} for user ${username} from ${req.ip}`);
  return res.status(200).json({ message: "OTP resent to your email" });
}

module.exports = { login,verifyOTP, generateToken,resendOTP,validateToken};