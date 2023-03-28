const mysql = require("mysql2"); //database
const { config } = require("../../Database/config"); //database
const pool = mysql.createPool(config); //database

const joi = require("joi"); //validation
const schema = joi.number().min(1).max(999).required();

exports.getTaskId = function getTasksID(req, res) {
  const { error } = schema.validate(req.params.id); //(req.params.id = url parameter)
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const query = "SELECT * FROM Tasks  WHERE ListID  = ?";
  const values = [req.params.id];
  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.length === 0) {
      return res.status(404).json("No task found");
    }
    if (rows.length > 0) {
      return res.status(200).json(rows);
    }
    res.status(500).json("something unexpected happened");
  });
};
