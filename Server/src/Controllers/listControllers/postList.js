const mysql = require('mysql2'); //database
const {config} = require('../../Database/config'); //database
const pool = mysql.createPool(config); //database

const joi = require('joi'); //validation
const schema = joi.object({
    ListName: joi.string().required().min(1).max(150),
    UserID: joi.number().required().min(1).max(50)
})


exports.postList = function postList(req, res) {
    listName = req.body.ListName //TODO: remove spaces from end of string
    const {error} = schema.validate(req.body); //validation
    if (error) {
        return res.status(400).send(error.details[0].message);
    } //validation

    pool.execute("INSERT INTO Lists (ListName, UserID) VALUES (?, ?)", [listName,req.body.UserID], function(err, rows, fields) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json("List already exists")
        }
        console.log(err)
        return res.status(500).json("error while performing query")
      }
      if(rows.affectedRows === 1) {
        return res.status(200).json("List created")
      }
        res.status(500).json("something unexpected happened")
    })
}
