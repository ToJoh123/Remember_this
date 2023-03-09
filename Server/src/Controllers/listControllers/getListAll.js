const mysql = require('mysql2'); //database
const {config} = require('../../Database/config');

const pool = mysql.createPool(config);

exports.getListAll = function getListAll(req, res) {
    pool.execute("SELECT * FROM Lists", function(err, rows, fields) {
      if (err) {
          return res.status(500).json("error while performing query")
      }
      res.status(200).json(rows)
    })
}
