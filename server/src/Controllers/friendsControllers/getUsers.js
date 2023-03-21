const mysql = require("mysql2"); //database
const { config } = require("../../Database/config");
const pool = mysql.createPool(config);
const jwt = require("jsonwebtoken"); //token

/*
SELECT u.ID as userId, Username as username 
FROM Users u
LEFT JOIN Friendships f ON f.Follower = 12 AND f.Following = u.ID
WHERE  f.Follower IS NULL and u.ID != 12;
*/
//this function returns users that are not friends with the current user
exports.getUsers = function getUsers(req, res) {
  const decoded = jwt.decode(req.cookies.authToken);
  const query =
    "SELECT u.ID as userId, Username as username FROM Users u LEFT JOIN Friendships f ON f.Follower = ? AND f.Following = u.ID WHERE  f.Follower IS NULL and u.ID != ?";
  const values = [decoded.ID, decoded.ID]; //to get all users except the current user

  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.length === 0) {
      return res.status(404).json("No users found");
    }
    if (rows.length > 0) {
      return res.status(200).json(rows);
    }
    res.status(500).json("something unexpected happened");
  });
};
