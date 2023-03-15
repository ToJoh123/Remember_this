const mysql = require('mysql2'); //database
const {config} = require('../../Database/config'); //database
const pool = mysql.createPool(config); //database
const jwt = require('jsonwebtoken'); //authentication
// const joi = require('joi'); //validation
// const schema = joi.number().min(1).max(999).required(); //validation

//TODO: Is this the best way to query tasks by listID?

exports.getTaskAll = function getTasksID(req, res) {
    const  decoded = jwt.decode(req.cookies.authToken);
    // const validate = schema.validate(req.params.id);
    // if(validate.error) return res.status(400).json(validate.error.details[0].message)
    const query = "SELECT * FROM Tasks t INNER JOIN Lists l ON t.listID = l.ID WHERE l.userID  = ?";
    const values = [decoded.ID]
    pool.execute(query,values, function(err, rows, fields) {
        if (err) {
            console.log(err)
            return res.status(500).json("error while performing query")
        }
        if(rows.length === 0) {
            return res.status(404).json("No task found")
        }
        if(rows.length > 0){
            return res.status(200).json(rows)
        }
        res.status(500).json("something unexpected happened")
    })

}