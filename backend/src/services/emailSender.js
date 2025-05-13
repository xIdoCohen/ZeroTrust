const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

function sendOTPmail(destination,otp) {
  return transporter.sendMail({
    from: `"ZeroTrust OTP" <${process.env.EMAIL_USER}>`,
    to: destination,
    subject: "Your one Time password",
    text: `Your OTP is ${otp} . It expires in 1 minute.`
  });
}

module.exports = sendOTPmail;
