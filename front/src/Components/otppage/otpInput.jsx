import React, { useEffect, useRef, useState } from 'react';
import './otpPage.css'; // optional if using shared styles

export default function OtpInput({ onSubmit, onResend }) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(prev => prev - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every(val => val !== '')) {
      onSubmit(otp.join(''));
    } else {
      alert('Please fill all 6 digits.');
    }
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setTimer(60);
    onResend?.();
    inputsRef.current[0].focus();
  };

  return (
    <div className="center">
      <div className="otpContainer">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e.target.value, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            className="otpInput"
          />
        ))}
      </div>
      <div className="wrapper">
        <button className="otpButton" onClick={handleSubmit}>Verify</button>
        <button
          className="otpButton"
          onClick={handleResend}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${timer}s` : 'Send again'}
        </button>
      </div>
      
    </div>
  );
}
