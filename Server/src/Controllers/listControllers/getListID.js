const mysql = require('mysql2'); //database
const {config} = require('../../Database/config'); //database
const pool = mysql.createPool(config); //database

const joi = require('joi'); //validation
const schema = joi.number().min(1).max(999).required(); //validation
const jwt = require('jsonwebtoken');
exports.getListID = function getListAll(req, res) {

const token = req.cookies.authToken;
const decoded = jwt.decode(token);
const id = decoded.id;
console.log(id);
    const validate = schema.validate(req.params.id);
    if(validate.error) return res.status(400).json(validate.error.details[0].message)
    pool.execute("SELECT * FROM Lists WHERE userID = ?",[req.params.id], function(err, rows, fields) {
      if (err) {
          return res.status(500).json("error while performing query")
      }
      if(rows.length === 0) return res.status(404).json("No list found")

      res.status(200).json(rows)
    })
}
