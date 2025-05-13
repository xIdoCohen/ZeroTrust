import "./login.css";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react";
import validate from "../../common/validate";
import Connections from "../../common/Connections";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const siteKey = "6LcGtTYrAAAAAHvhYGAul9kJQbAVNWARUcbqTddZ";

  useEffect(() => {
    setCaptchaToken(null);
  }, [username, password]);

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setUsernameError("Please complete the CAPTCHA");
      setPasswordError("Please complete the CAPTCHA");
      return;
    }

    const user = { username, password };
    const ret = { usernameError: null, passwordError: null, success: true };
    validate(user, ret);
    setUsernameError(ret.usernameError);
    setPasswordError(ret.passwordError);

    if (ret.success) {
      Connections.postData("https://localhost:3000/auth/login", {
        username,
        password,
        captchaToken,
      })
        .then((data) => {
          console.log("Login success:", data);
          navigate("/otp", { state: { username ,password ,captchaToken}, });
        })
        .catch((error) => {
          console.log("Login error:", error);
          setUsernameError("Invalid username or password");
          setPasswordError("Invalid username or password");
          setTimeout(() => {
            setUsernameError("");
            setPasswordError("");
          }, 3000);
        });
    }
  };

  const handleCheckClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="logincontainer">
      <div className="icon-container">
        <AccountBoxIcon style={{ fontSize: '4rem', color: "bb86fc" }} />
      </div>
      <div className="title">Login</div>
      <p className="subTitle">Please log in to access your cameras</p>
      <span>
        <div className="input-wrapper">
          <PersonIcon className="input-icon " />
          <input
            className="inputClass"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label className="errorLabel">{usernameError}</label>

        <div className="input-wrapper">
          <LockIcon className="input-icon" color="#4A2C1F" />
          <input
            className="inputClass"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <label className="errorLabel">{passwordError}</label>
        <div className="showpass">
          <input
            className="checkbox"
            type="checkbox"
            name="Show password"
            checked={showPassword}
            onChange={handleCheckClick}
            color="#4A2C1F"
          />
          <label style={{ padding: "0px 10px 10px 10px" }}>Show password</label>
        </div>
      </span>

      <ReCAPTCHA
        sitekey={siteKey}
        onChange={(token) => {setCaptchaToken(token);        }}
        size="normal"
      />

      <div className="center">
        <button
          className="button"
          onClick={handleClick}
          disabled={!captchaToken} 
        >
          Log in
        </button>
      </div>
    </form>
  );
}

export default Login;
