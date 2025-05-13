// src/middlewares/validate.js

function validateEmail(email) {
    email = email === null ? "" : email;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
  }
  
  function validatePassword(password) {
    password = password === null || password === undefined ? "" : password;
    const validRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return validRegex.test(password);
  }
  
  function validate(req, res, next) {
    const { email, password } = req.body;
  
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
  
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be 7–15 characters long, include at least one number and one special character."
      });
    }
    next();
  }
  
   module.exports = validate;
  