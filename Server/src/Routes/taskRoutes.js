const express = require('express');
const { getTasksID } = require('../Controllers/taskController/getTasksID');
const { postTask } = require('../Controllers/taskController/postTask');
const { deleteTask } = require('../Controllers/taskController/deleteTask');
const { patchTask } = require('../Controllers/taskController/patchTask');
const taskRoutes = express.Router();
taskRoutes.get('/:id', getTasksID);
taskRoutes.post('/',postTask)
taskRoutes.delete('/',deleteTask)
taskRoutes.patch('/',patchTask)

exports.taskRoutes = taskRoutes;