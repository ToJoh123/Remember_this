const mysql = require("mysql2"); //database
const { config } = require("../../Database/config"); //database
const pool = mysql.createPool(config); //database

const joi = require("joi"); //validation
const schema = joi.object({
  ID: joi.number().required().min(1).max(999),
  Text: joi.string().required().min(1).max(150),
  ListID: joi.number().required().min(1).max(999),
});

exports.patchTask = function patchTask(req, res) {
  const { error } = schema.validate(req.body); //validation
  if (error) {
    return res.status(400).json(error.details[0].message);
  } //validation

  const query = "UPDATE Tasks SET Text = ?, ListID = ? WHERE ID = ? ";
  const values = [req.body.Text, req.body.ListID, req.body.ID];
  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(404).json("No list found");
      }
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.affectedRows === 0) {
      return res.status(404).json("No task found");
    }
    if (rows.affectedRows === 1) {
      return res.status(200).json("Task updated");
    }
    res.status(500).json("something unexpected happened");
  });
};
