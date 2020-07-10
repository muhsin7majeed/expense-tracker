const JOI = require("@hapi/joi");
const { sendResponse } = require("./helper");

const joiOptions = {
  abortEarly: false,
};

/* --------------------------- SIGN IN VALIDATION --------------------------- */

const validateSignin = (body, res) => {
  const schema = JOI.object({
    emailId: JOI.string().trim().email().required(),
    password: JOI.string().min(4).required(),
  }).options(joiOptions);

  const { value, error } = schema.validate(body);
  if (!error) return value;

  const errors = error.details.map(detail => detail.message.replace(/"/g, ""));
  sendResponse(res, 400, "Validation Error", errors);
};

/* ---------------------------- SIGNUP VALIDATION --------------------------- */

const validateSignup = (body, res) => {
  const schema = JOI.object({
    userName: JOI.string().required(),
    emailId: JOI.string().trim().email().required(),
    password: JOI.string().min(4).required(),
    phoneNo: JOI.number().required(),
    userImg: JOI.string().default(null),
  }).options(joiOptions);

  const { value, error } = schema.validate(body);
  if (!error) return value;

  const errors = error.details.map(detail => detail.message.replace(/"/g, ""));
  sendResponse(res, 400, "Validation Error", errors);
};

module.exports = { validateSignin, validateSignup };
