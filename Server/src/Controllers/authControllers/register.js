const mysql = require('mysql2'); //database
const {config} = require('../../Database/config');
const bcrypt = require('bcrypt');// 🐝⚰️->#️⃣->🧂->🔑=🔐
const pool = mysql.createPool(config);
const joi = require('joi'); //validation
const schema = joi.object({
    name: joi.string().min(0).max(45),
    username: joi.string().min(3).max(45).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(15).required(),
 })

exports.register = function register (req, res) {
     const validate = schema.validate(req.body)
     if (validate.error) {
        return res.status(400).json(validate.error.details[0].message);
     }
     const query = 'INSERT INTO Users (Name, Username, Email, Password) VALUES (?, ?, ?, ?)'

     const salt = bcrypt.genSaltSync(10); 
     const hashedPassword = bcrypt.hashSync(req.body.password, salt);
     const values = [req.body.name, req.body.username, req.body.email, hashedPassword];
     pool.execute(query, values, (err, rows,fields) => {
        if (err) {
            console.log(err)
            if (err.code === 'ER_DUP_ENTRY') {
                if(err.sqlMessage.includes('Users.Users_UNIQUE')) {
                    res.status(400).send('Username already exists')
                    return;
                }
                if(err.sqlMessage.includes('Users.Email_UNIQUE')) {
                    res.status(400).send('Email already exists')
                    return;
                }
            }
            res.status(500).send('error while performing query')
            return;
        }
        if (rows.affectedRows === 1) {
            res.status(200).send('User added')
            return;
        }
        res.status(500).send('Something unexpected happened')
    })
}