const mysql = require('mysql2'); //database
const {config} = require('../../Database/config');
const joi = require('joi'); //validation
const bcrypt = require('bcrypt');// 
const jwt = require('jsonwebtoken'); //🍪
const secret = process.env.ACCESS_TOKEN_SECRET;
const pool = mysql.createPool(config);
const schema = joi.object({
    username: joi.string().min(3).max(45).required(),
    // Email: joi.string().email().required(),
    password: joi.string().min(3).max(15).required(),
 })

exports.login = function login (req, res) {
    
     const validate = schema.validate(req.body)
     if (validate.error) {
        return res.status(400).json(validate.error.details[0].message);
     }
     const getPassword = `
     SELECT password FROM Users WHERE Username=?`;
     const values = [req.body.username];
     pool.execute(getPassword, values, function (err,rows, fields) {
         if (err) {
             console.log(err);
             return res.status(500).json({message: 'Internal Server Error'});
         }
         if (rows.length === 0) {
             return res.status(404).json({message: 'User not found'});
         }

         const isPasswordCorrect = bcrypt.compareSync(req.body.password, rows[0].password);
         if (!isPasswordCorrect) {
               return res.status(400).json({message: 'Incorrect password'});
         }
         if (isPasswordCorrect) {
            //TODO: Create a token and send it back to the client
            
            // Get user information from the database
            const getUserQuery = `SELECT * FROM Users WHERE Username = ?`;
            pool.execute(getUserQuery, values, (err, rows, fields) => {
              if (err) {
                console.log(err);
                return res.status(500).json({message: 'Internal Server Error'});
              }
              const copyOfUser = rows[0];
              delete copyOfUser.password;
              delete copyOfUser.name;
              delete copyOfUser.email;
              const authToken = jwt.sign(copyOfUser, secret, {expiresIn: 120});
              res.cookie('authToken', authToken, {
                maxAge: 360000,
                sameSite: 'none',
                // Secure är just nu buggat för Postman, använd inte secure: true för Postman.
                // secure: true,
                httpOnly: true
            });  
              // Return a success response to the client
               res.status(200).json({message: 'Login successful'});
               return;
            });
          }
          //TODO: Ask if possible or necessary to create a oops something unexpected happened 🤷
     })
    }