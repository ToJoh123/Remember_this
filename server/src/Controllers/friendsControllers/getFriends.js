const mysql = require("mysql2"); //database
const { config } = require("../../Database/config");
const jwt = require("jsonwebtoken"); //🍪
const pool = mysql.createPool(config);

exports.getFriends = function getFriends(req, res) {
  decoded = jwt.decode(req.cookies.authToken);
  const query = "SELECT * FROM Friendships WHERE Follower = ?";
  const values = [decoded.ID];
  pool.execute(query, values, function (err, rows) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.length === 0) {
      return res.status(404).json("No friends found");
    }
    if (rows.length > 0) {
      return res.status(200).json(rows);
    }
    res.status(500).json("something unexpected happened");
  });
};
