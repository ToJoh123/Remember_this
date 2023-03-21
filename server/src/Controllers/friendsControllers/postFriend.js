const mysql = require("mysql2"); //database
const { config } = require("../../Database/config");
const jwt = require("jsonwebtoken"); //🍪
const pool = mysql.createPool(config);
const joi = require("joi"); //validation
const schema = joi.object({
  Followed: joi.number().required().min(1).max(999),
});

exports.postFriend = function postFriend(req, res) {
  const { error } = schema.validate(req.body); //validation
  if (error) {
    return res.status(400).json(error.details[0].message);
  } //validation

  decoded = jwt.verify(req.cookies.authToken, process.env.ACCESS_TOKEN_SECRET);
  console.log(decoded.ID);
  const query = "INSERT INTO Friendships (Follower, Following) VALUES (?, ?)";
  const values = [decoded.ID, req.body.Followed];
  pool.execute(query, values, function (err, rows) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.length === 0) {
      return res.status(404).json("No friends found");
    }
    if (rows.affectedRows === 1) {
      return res.status(200).json("You are now following user");
    }
    res.status(500).json("something unexpected happened");
  });
};
