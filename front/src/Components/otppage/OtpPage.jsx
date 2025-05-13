import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OtpInput from './otpInput';
import Connections from '../../common/Connections';
import './otpPage.css';

export default function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username =location.state?.username || '';
  const [error, setError] = useState('');

  const handleVerify = async (otpCode) => {
    try {
      await Connections.postData("https://localhost:3000/auth/verifyOTP", {
        username:username,
        otp: otpCode
      });
  
      await Connections.getData('https://localhost:3000/auth/token', {
        username
      });
  
      setTimeout(() => navigate("/dashboard"), 4000); // 100-300ms is usually enough
    } catch (err) {
      console.error(err);
      setError('Invalid code. Please try again.');
    }
  };
  

  const handleResend = async () => {
    try {
      console.log(username)
     
      await Connections.postData('https://localhost:3000/auth/resendOTP', { username });
    } catch (e){
      console.error(e);
      setError('Failed to resend code.');
    }
  };

  return (
    <div className="mainScreen">
      <h1 className="title">Enter Verification Code</h1>
      <p className="subTitle">Check your email for a 6-digit code</p>
      {error && <div className="errorLabel">{error}</div>}
      <OtpInput onSubmit={handleVerify} onResend={handleResend} />
    </div>
  );
}
