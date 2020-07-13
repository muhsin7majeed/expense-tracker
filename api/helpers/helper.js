const JWT = require("jsonwebtoken");
require("dotenv").config();

const sendResponse = (res, status, message, data = {}) => {
  return res.status(status).json({ message, data });
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader || bearerHeader === "undefined") return sendResponse(res, 403, "Access Denied", {});

  const token = bearerHeader.split(" ")[1];

  try {
    JWT.verify(token, process.env.JWT_KEY, (err, authToken) => {
      if (err || !authToken || !authToken.userId) return sendResponse(res, 403, "Access Denied", {});

      req.body.userId = authToken.userId;
      next();
    });
  } catch (err) {
    return sendResponse(res, 500, "Something went wrong", {});
  }
};
module.exports = { sendResponse, verifyToken };
