const mysql = require('mysql2'); //database
const {config} = require('../../Database/config'); //database
const pool = mysql.createPool(config); //database

const joi = require('joi'); //validation
//validation
const schema = joi.object({
    ListName: joi.string().required(),
    UserId: joi.string().required()
})

exports.postList = function postList(req, res) {
    const {error} = schema.validate(req.body); //validation
    if (error) return res.status(400).send(error.details[0].message); //validation
    pool.execute("INSERT INTO Lists (ListName) VALUES (?)", [req.body.ListName], function(err, rows, fields) {
      if (err) {
          return res.status(500).json("error while performing query")
      }
      res.status(200).json(rows)
    })
}
