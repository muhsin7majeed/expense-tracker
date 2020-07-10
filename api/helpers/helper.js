const sendResponse = (res, status, message, data = {}) => {
  return res.status(status).json({ message, data });
};

module.exports = { sendResponse };
