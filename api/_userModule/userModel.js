const dbConn = require("../../config/db");
const errorCodes = require("../helpers/errorCodes");

/* ------------------------------- LOGIN USER ------------------------------- */

const userLogin = (user, callback) => {
  const query = `SELECT * 
                 FROM users 
                 WHERE email_id='${user.emailId}' 
                 AND password='${user.password}';`;

  try {
    dbConn.query(query, async (err, res) => {
      if (err) return callback({ status: false, data: { errorCode: errorCodes.DB_ERROR } });
      if (!res.length) return callback({ status: false, data: { message: "Email ID or Password doesn't match" } });
      if (res && res[0] && res[0].id && res[0].id > 0) {
        callback({ status: true, data: res[0] });
      }
    });
  } catch (err) {
    callback({ status: false, data: { errorCode: errorCodes.DB_ERROR } });
  }
};

/* ------------------------------- SIGNUP USER ------------------------------ */

const userSignup = (newUser, callback) => {
  const findOneQuery = `SELECT phone_no, email_id 
                        FROM users 
                        WHERE (email_id LIKE '${newUser.emailId}' 
                        OR phone_no LIKE '${newUser.phoneNo}');`;

  const insertQuery = `INSERT INTO
                       users (user_name, email_id, phone_no, avatar, password)
                       VALUES ('${newUser.userName}','${newUser.emailId}','${newUser.phoneNo}',
                               '${newUser.userImg ? newUser.userImg : null}','${newUser.password}')`;

  try {
    /* ----------------- CHECK IF EMAIL OR PHONE ALREADY EXISTS ----------------- */

    dbConn.query(findOneQuery, async (err, res) => {
      if (err) return callback({ status: false, data: { errorCode: errorCodes.DB_ERROR } });
      if ((res[0] && res[0]?.phone_no == newUser.phoneNo) || res[0]?.email_id == newUser.emailId)
        return callback({
          status: false,
          data: { message: res[0].email_id == newUser.emailId ? "Email ID already exists" : "Phone No already used" },
        });
      else {
        /* ----------------------------- CREATE NEW USER ---------------------------- */

        dbConn.query(insertQuery, async (err, res) => {
          if (err) return callback({ status: false, data: { errorCode: errorCodes.DB_ERROR } });
          else {
            callback({ status: true, user_id: res.insertId });
          }
        });
      }
    });
  } catch (err) {
    callback({ status: false, data: { errorCode: errorCodes.DB_ERROR } });
  }
};

module.exports = { userLogin, userSignup };
