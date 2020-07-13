require("dotenv").config();
const JWT = require("jsonwebtoken");
const errorCodes = require("../helpers/errorCodes");
const { userLogin, userSignup, userBalance } = require("./userModel");

/* ------------------------------- LOGIN USER ------------------------------- */

const loginUser = (userData, callback) => {
  userLogin(userData, respData => {
    if (!respData.status) return callback({ status: false, ...respData });

    JWT.sign({ userId: respData.data.id }, process.env.JWT_KEY, { expiresIn: "30d" }, (err, res) => {
      if (err) return callback({ status: false, data: { errorCode: errorCodes.JWT_ERROR } });

      const userObj = {
        userId: respData.id,
        userName: respData.data.user_name,
        emailId: respData.data.email_id,
        phoneNo: respData.data.phone_no,
        userImg: respData.data.avatar,
      };

      callback({ status: true, data: { token: res, user: userObj } });
    });
  });
};

/* ------------------------------- SIGNUP USER ------------------------------ */

const signupUser = (userData, callback) => {
  userSignup(userData, respData => {
    if (!respData.status) return callback({ status: false, ...respData });

    JWT.sign({ userId: respData.user_id }, process.env.JWT_KEY, { expiresIn: "30d" }, (err, res) => {
      if (err) return callback({ status: false, data: { errorCode: errorCodes.JWT_ERROR } });

      const userObj = {
        userId: respData.user_id,
        userName: userData.userName,
        emailId: userData.emailId,
        phoneNo: userData.phoneNo,
        userImg: userData.avatar,
      };

      callback({ status: true, data: { token: res, user: userObj } });
    });
  });
};

/* ------------------------------- ADD BALANCE ------------------------------ */

const balanceSet = (data, callback) => {
  userBalance(data, response => {
    if (!response.status) return callback({ status: false });
    callback({ status: true, data: {} });
  });
};

module.exports = { loginUser, signupUser, balanceSet };
