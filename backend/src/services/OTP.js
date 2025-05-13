const crypto = require('crypto');

const OTPmap=new Map();

function generateOTP() {
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += crypto.randomInt(0, 10); 
    }
    return OTP;
}

function saveOTP(username, otp) {
    const expirationTime = Date.now() + 60 * 1000; 
    OTPmap.set(username, { otp, expirationTime ,isVerified:false});
}


function verifyOTPinput(username, OTPinput) {
    const record = OTPmap.get(username);
    if (!record) return false;
  
    if (Date.now() - record.createdAt > 60 * 1000) {
        OTPmap.delete(username);
      return false;
    }
  
    if (record.otp === OTPinput) {
      record.isVerified = true;
      OTPmap.set(username, record);
      return true;
    }
    return false;
  }

  function isVerified(username) {
    const record = OTPmap.get(username);
    return record?.isVerified || false;
  }

  function clearOTP(username) {
    OTPmap.delete(username);
  }

module.exports = {generateOTP,saveOTP,verifyOTPinput,isVerified,clearOTP};

