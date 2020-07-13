const JOI = require("@hapi/joi");
const { sendResponse } = require("./helper");

const joiOptions = {
  abortEarly: false,
};

const sendValidationErr = (err, res) => {
  const errors = err.details.map(detail => detail.message.replace(/"/g, ""));
  sendResponse(res, 400, "Validation Error", errors);
};

/* --------------------------- SIGN IN VALIDATION --------------------------- */

const validateSignin = (body, res) => {
  const schema = JOI.object({
    emailId: JOI.string().trim().email().required(),
    password: JOI.string().min(4).required(),
  }).options(joiOptions);

  const { value, error } = schema.validate(body);
  if (error) return sendValidationErr(error, res);
  return value;
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
  if (error) return sendValidationErr(error, res);
  return value;
};

/* -------------------------- VALIDATE ADD BALANCE -------------------------- */

const validateBalance = (body, res) => {
  const schema = JOI.object({
    amount: JOI.number().required(),
    userId: JOI.number().required(),
  });

  const { value, error } = schema.validate(body);
  if (error) return sendValidationErr(error, res);
  return value;
};

module.exports = { validateSignin, validateSignup, validateBalance };
