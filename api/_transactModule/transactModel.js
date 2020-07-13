const dbConn = require("../../config/db");
const errorCodes = require("../helpers/errorCodes");

const getTrans = (reqData, callback) => {
  const condition = reqData.type === "inc" || reqData.type === "exp" ? `AND T.type = '${reqData.type}'` : "";
  console.log({ condition });
  const query = `SELECT 
                    T.id, 
                    T.title, 
                    T.message, 
                    T.date, 
                    T.amount, 
                    T.type, 
                    C.category, 
                    C.icon 
                 FROM transactions T 
                 INNER JOIN categories C 
                    ON T.cat_id = C.id 
                 WHERE 
                    T.user_id = ${reqData.userId}
                    ${condition}`;

  try {
    dbConn.query(query, (err, result) => {
      console.log(err);
      if (err) return callback({ status: false, data: { errorCode: errorCodes.DB_ERROR } });
      callback({ status: true, data: result });
    });
  } catch (err) {
    callback({ status: false, data: { errorCode: errorCodes.DB_ERROR } });
  }
};

module.exports = { getTrans };
