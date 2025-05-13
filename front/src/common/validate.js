function ValidateEmail(input) {
  input = input === null ? "" : input;
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(input);
}

function ValidatePass(input) {
  input = input === null || input === undefined ? "" : input;
  const validRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return validRegex.test(input);
}	  

const validate = (data, ret) => {
  if (Object.prototype.hasOwnProperty.call(ret, "usernameError") && (data.username.length < 4 || data.username.length > 30)) {
    ret.usernameError = "Username must be between 4-30 characters";
    ret.success = false;
  }
  if (Object.prototype.hasOwnProperty.call(ret, "passwordError") && !ValidatePass(data.password)) {
    ret.passwordError = "Password is not valid";
    ret.success = false;
  }
  if (Object.prototype.hasOwnProperty.call(ret, "confirmPasswordError") && !ValidatePass(data.password)&&(data.password!==data.confirmPassword)) {
    ret.confirmPasswordError = "Password does not match";
    ret.success = false;
  }
  if (Object.prototype.hasOwnProperty.call(ret, "emailError") && !ValidateEmail(data.email)) {
    ret.emailError = "Email is not valid";
    ret.success = false;
  }
  
};
export default validate;
  