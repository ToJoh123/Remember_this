const mysql = require("mysql2"); //database
const { config } = require("../../Database/config");
const pool = mysql.createPool(config);
const jwt = require("jsonwebtoken"); //token

exports.getUsers = function getFriends(req, res) {
  const decoded = jwt.decode(req.cookies.authToken);
  const query = "SELECT * FROM Users WHERE ID !=(?)";
  const values = [decoded.ID]; //to get all users except the current user

  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.length === 0) {
      return res.status(404).json("No users found");
    }
    if (rows.length > 0) {
      //remove password and email
      const cleanedRows = rows.map((row) => {
        const { Password, Email, ...rest } = row;
        return rest;
      });
      return res.status(200).json(cleanedRows);
    }
    res.status(500).json("something unexpected happened");
  });
};
