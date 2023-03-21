const mysql = require("mysql2"); //database
const { config } = require("../../Database/config");
const pool = mysql.createPool(config);
/*
SELECT Tasks.ID AS taskId, Tasks.text, Tasks.status, Lists.ListName as listName,Lists.ID AS listId 
FROM Tasks RIGHT JOIN Lists ON Tasks.listID = Lists.ID JOIN Users ON Lists.UserID = Users.ID 
WHERE Users.ID = 1;
*/
exports.getFriendData = function getFriendData(req, res) {
  const data = { Lists: [], Friends: [] };
  const query =
    "SELECT Tasks.ID AS taskId, Tasks.text, Tasks.status, Lists.ListName as listName,Lists.ID AS listId FROM Tasks RIGHT JOIN Lists ON Tasks.listID = Lists.ID JOIN Users ON Lists.UserID = Users.ID WHERE Users.ID = ?";
  const values = [req.params.id];
  pool.execute(query, values, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json("error while performing query");
    }
    if (rows.length === 0) {
      return res.status(404).json("No Friendly lists found!");
    }
    if (rows.length > 0) {
      //build lists with structure {listName: string, listId: number, tasks: [{taskId: number, text: string, status: string}]}
      // i did not manage to create flat structure with mysql query that represents the parent child relationship between lists and tasks
      const lists = rows.reduce((acc, row) => {
        const list = acc.find((list) => list.listId === row.listId);
        if (list) {
          list.tasks.push({
            taskId: row.taskId,
            text: row.text,
            status: row.status,
          });
        } else {
          acc.push({
            listName: row.listName,
            listId: row.listId,
            tasks: [{ taskId: row.taskId, text: row.text, status: row.status }],
          });
        }
        return acc;
      }, []);
      data.Lists = lists;
      return res.status(200).json(data);
    }

    res.status(500).json("something unexpected happened");
  });
};
