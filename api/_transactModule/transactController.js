const { transactionGet } = require("./transactService");
const { sendResponse } = require("../helpers/helper");

/* ---------------------------- GET TRANSACTIONS ---------------------------- */

const getTransactions = (req, res) => {
  const reqData = { userId: req.body.userId, ...req.params };

  transactionGet(reqData, response => {
    if (!response.status) return sendResponse(res, 500, "Something went wrong", response.data);
    if (response.data.length) sendResponse(res, 200, "Success", response.data);
    else sendResponse(res, 404, "Nothing Found", response.data);
  });
};

/* --------------------------- ADD NEW TRANSACTION -------------------------- */

const addTransactions = (req, res) => {};

/* --------------------------- DELETE TRANSACTIONS -------------------------- */

const deleteTransactions = (req, res) => {};

/* --------------------------- UPDATE TRANSACTIONS -------------------------- */

const updateTransactions = (req, res) => {};

module.exports = { getTransactions, addTransactions, deleteTransactions, updateTransactions };
