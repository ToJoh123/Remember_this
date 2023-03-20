const mysql = require("mysql2"); //database
const { config } = require("../../Database/config"); //database
const pool = mysql.createPool(config); //database
const jwt = require("jsonwebtoken"); //🍪

const joi = require("joi"); //validation
const schema = joi.object({
  ID: joi.number().required().min(1).max(999),
  ListName: joi.string().required().min(1).max(150),
});

exports.patchList = function patchList(req, res) {
  const { error } = schema.validate(req.body); //validation
  if (error) {
    return res.status(400).json(error.details[0].message);
  } //validation
  //this code will get the id from the cookie
  const decoded = jwt.decode(req.cookies.authToken);

  const query = "UPDATE Lists SET ListName = ?,  UserID = ? WHERE ID = ?";
  const values = [req.body.ListName, decoded.ID, req.body.ID];

  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.affectedRows === 0) {
      return res.status(404).json("List not found");
    }
    if (rows.affectedRows === 1) {
      return res.status(200).json("List updated");
    }
    res.status(500).json("something unexpected happened");
  });
};
