require("dotenv").config();
const MySql = require("mysql");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let dbConn = MySql.createPool(dbConfig);

// CONNECTION TEST
// dbConn.query("SELECT * FROM users;", (err, res) => {
//   console.log(err, res);
// });
// handleDisconnect(dbConn);

// function handleDisconnect(mySqlClient) {
//   mySqlClient.on("error", function (error) {
//     if (!error.fatal) return;
//     if (error.code !== "PROTOCOL_CONNECTION_LOST") throw err;

//     dbConn = MySql.createPool(mySqlClient.config);
//     handleDisconnect(dbConn);
//     dbConn.connect();
//   });
// }

module.exports = dbConn;
