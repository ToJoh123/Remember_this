const express = require('express');
const { getTaskAll } = require('../Controllers/taskController/getTaskAll');
const { postTask } = require('../Controllers/taskController/postTask');
const { deleteTask } = require('../Controllers/taskController/deleteTask');
const { patchTask } = require('../Controllers/taskController/patchTask');
const { getTaskId } = require('../Controllers/taskController/getTaskId');
const taskRoutes = express.Router();
taskRoutes.get('/all', getTaskAll);
taskRoutes.get('/:id', getTaskId);
taskRoutes.post('/',postTask)
taskRoutes.delete('/',deleteTask)
taskRoutes.patch('/',patchTask)

exports.taskRoutes = taskRoutes;