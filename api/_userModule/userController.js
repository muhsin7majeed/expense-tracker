const { sendResponse } = require("../helpers/helper");
const { validateSignin, validateSignup } = require("../helpers/validators");
const { loginUser, signupUser } = require("./userService");

/* --------------------------- SIGN IN CONTROLLER --------------------------- */

const signin = (req, res) => {
  // try {
  const validData = validateSignin(req.body, res);

  loginUser(validData, respData => {
    if (respData.status) sendResponse(res, 200, "Signin Sucessful", respData.data);
    else sendResponse(res, 500, "Something went wrong", respData.data);
  });
};

/* --------------------------- SIGN UP CONTROLLER --------------------------- */

const signup = (req, res) => {
  const validData = validateSignup(req.body, res);

  signupUser(validData, response => {
    if (response.status) return sendResponse(res, 200, "Signup Successful", response);
    else return sendResponse(res, 500, "Something went wrong", response.data);
  });
};

module.exports = { signin, signup };
