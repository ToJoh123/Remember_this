const mysql = require("mysql2"); //database
const { config } = require("../../Database/config");
const pool = mysql.createPool(config);

exports.getUsers = function getFriends(req, res) {
  const query = "SELECT * FROM Users";

  pool.execute(query, function (err, rows, fields) {
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
