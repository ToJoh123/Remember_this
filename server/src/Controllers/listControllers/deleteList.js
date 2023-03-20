const mysql = require("mysql2"); //database
const { config } = require("../../Database/config"); //database
const pool = mysql.createPool(config); //database

const joi = require("joi"); //validation
const schema = joi.object({
  ID: joi.number().required().min(1).max(999),
});
exports.deleteList = function deleteList(req, res) {
  const { error } = schema.validate(req.body); //validation
  if (error) {
    return res.status(400).json(error.details[0].message);
  } //validation

  const query = "DELETE FROM Lists WHERE ID = ?";
  const values = [req.body.ID];

  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.affectedRows === 0) {
      return res.status(404).json("List not found");
    }
    if (rows.affectedRows === 1) {
      return res.status(200).json("List deleted");
    }
    res.status(500).json("something unexpected happened");
  });
};
