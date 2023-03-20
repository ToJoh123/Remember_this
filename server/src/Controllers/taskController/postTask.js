const mysql = require("mysql2"); //database
const { config } = require("../../Database/config"); //database
const pool = mysql.createPool(config); //database

const joi = require("joi"); //validation
const schema = joi.object({
  Text: joi.string().required().min(1).max(150),
  ListID: joi.number().required().min(1).max(999),
});

exports.postTask = function postTask(req, res) {
  const { error } = schema.validate(req.body); //validation
  if (error) {
    return res.status(400).json(error.details[0].message);
  } //validation

  const query = "INSERT INTO Tasks (Text, ListID) VALUES (?, ?)";
  const values = [req.body.Text, req.body.ListID];
  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json("Task already exists");
      }
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json("that ListID does not exist");
      }
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.affectedRows === 1) {
      return res.status(200).json("Task created");
    }
    res.status(500).json("something unexpected happened");
  });
};
