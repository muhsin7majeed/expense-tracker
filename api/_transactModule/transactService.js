const { getTrans } = require("./transactModel");

const transactionGet = (reqData, callback) => {
  getTrans(reqData, response => {
    if (!response.status) return callback({ status: false, ...response.data });
    callback({ status: true, data: response.data });
  });
};

module.exports = { transactionGet };
