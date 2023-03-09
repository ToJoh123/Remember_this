const express = require('express');
const { getListAll } = require('../Controllers/listControllers/getListAll');
const { getListID } = require('../Controllers/listControllers/getListID');
const listRoutes = express.Router();
listRoutes.get('/all', getListAll);
listRoutes.get('/:id', getListID);

exports.listRoutes = listRoutes;