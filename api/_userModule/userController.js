const { sendResponse } = require("../helpers/helper");
const { validateSignin, validateSignup, validateBalance } = require("../helpers/validators");
const { loginUser, signupUser, balanceSet } = require("./userService");

/* --------------------------- SIGN IN CONTROLLER --------------------------- */

const signin = (req, res) => {
  const validData = validateSignin(req.body, res);

  if (validData)
    loginUser(validData, respData => {
      if (respData.status) sendResponse(res, 200, "Signin Sucessful", respData.data);
      else sendResponse(res, 500, "Something went wrong", respData.data);
    });
};

/* --------------------------- SIGN UP CONTROLLER --------------------------- */

const signup = (req, res) => {
  const validData = validateSignup(req.body, res);

  if (validData)
    signupUser(validData, response => {
      if (response.status) return sendResponse(res, 200, "Signup Successful", response);
      else return sendResponse(res, 500, "Something went wrong", response.data);
    });
};

/* ---------------------------- SET USER BALANCE ---------------------------- */

const setBalance = (req, res) => {
  const validData = validateBalance(req.body, res);

  if (validData)
    balanceSet(validData, response => {
      if (response.status) sendResponse(res, 200, "Balance updated successfully");
      else return sendResponse(res, 500, "Something went wrong", {});
    });
};

module.exports = { signin, signup, setBalance };
