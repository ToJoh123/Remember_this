const mysql = require("mysql2"); //database
const { config } = require("../../Database/config");
const jwt = require("jsonwebtoken"); //🍪
const pool = mysql.createPool(config);

//here we want to get the id from the cookie

exports.getData = function getListAll(req, res) {
  const data = { Lists: [], Friends: [] };
  //this code will get the id from the cookie
  const decoded = jwt.decode(req.cookies.authToken);

  const query =
    "SELECT Tasks.ID AS taskId, Tasks.text, Tasks.status, Lists.ListName as listName,Lists.ID AS listId FROM Tasks RIGHT JOIN Lists ON Tasks.listID = Lists.ID JOIN Users ON Lists.UserID = Users.ID WHERE Users.ID = ?";
  const values = [decoded.ID];
  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.length === 0) {
      return res.status(404).json("No task found");
    }
    if (rows.length > 0) {
      rows.forEach((row) => {
        if (data.Lists.length === 0) {
          data.Lists.push({
            listName: row.listName,
            listId: row.listId,
            tasks: [
              {
                taskId: row.taskId,
                text: row.text,
                status: row.status,
              },
            ],
          });
        } else {
          let found = false;
          data.Lists.forEach((list) => {
            if (list.listId === row.listId) {
              list.tasks.push({
                taskId: row.taskId,
                text: row.text,
                status: row.status,
              });
              found = true;
            }
          });
          if (!found) {
            data.Lists.push({
              listName: row.listName,
              listId: row.listId,
              tasks: [
                {
                  taskId: row.taskId,
                  text: row.text,
                  status: row.status,
                },
              ],
            });
          }
        }
      });

      return res.status(200).json(data);
    }
    res.status(500).json("something unexpected happened");
  });
};
