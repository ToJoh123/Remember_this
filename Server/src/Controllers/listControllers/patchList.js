const mysql = require('mysql2'); //database
const {config} = require('../../Database/config'); //database
const pool = mysql.createPool(config); //database

const joi = require('joi'); //validation
const schema = joi.object({
    ID: joi.number().required().min(1).max(50),
    ListName: joi.string().required().min(1).max(150),
    UserID: joi.number().required().min(1).max(50) //TODO: Is this field required?
})

exports.patchList = function patchList(req, res) {
    const {error} = schema.validate(req.body); //validation
    if (error) {
        return res.status(400).send(error.details[0].message);
    } //validation
    
    const query = "UPDATE Lists SET ListName = ?,  UserID = ? WHERE ID = ?"
    const values = [req.body.ListName,req.body.UserID,req.body.ID]

    pool.execute(query,values, function(err, rows, fields) {
      if (err) {
        console.log(err)
        return res.status(500).json("error while performing query")
      }
      if (rows.affectedRows === 0) {
        return res.status(404).json("List not found")
      }
      if(rows.affectedRows === 1) {
        return res.status(200).json("List updated")
      }
        res.status(500).json("something unexpected happened")
    })
}