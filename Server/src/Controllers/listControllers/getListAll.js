const mysql = require('mysql2'); //database
const {config} = require('../../Database/config');
const jwt = require('jsonwebtoken'); //🍪
const pool = mysql.createPool(config);

//here we want to get the id from the cookie


exports.getListAll = function getListAll(req, res) {

  //this code will get the id from the cookie
  const  decoded = jwt.decode(req.cookies.authToken);

    pool.execute("SELECT * FROM Lists WHERE UserID = ?",[decoded.ID], function(err, rows, fields) {
      if (err) {
        console.log(err);
          return res.status(500).json("error while performing query")
      }
      if (rows.length === 0) {
          return res.status(404).json("List not found")
      }
      
      res.status(200).json(rows)
    })
}
