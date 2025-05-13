// src/routes/auth.routes.js
const express = require("express");
const { login,verifyOTP, generateToken,resendOTP,validateToken } = require("../controllers/authController");
const router = express.Router();
const bruteForceBlocker = require("../middlewares/bruteForceBlocker");

router.use(bruteForceBlocker)
router.get("/validateToken",validateToken)

router.post("/login", login);
router.post("/verifyOTP",verifyOTP); 
router.get("/token",generateToken)



router.post("/resendOTP", resendOTP)


module.exports = router;
