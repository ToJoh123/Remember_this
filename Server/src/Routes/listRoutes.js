const express = require('express');
const { getListAll } = require('../Controllers/listControllers/getListAll');
const { getListID } = require('../Controllers/listControllers/getListID');
const { postList } = require('../Controllers/listControllers/postList');
const { patchList } = require('../Controllers/listControllers/patchList');
const { deleteList } = require('../Controllers/listControllers/deleteList');
const listRoutes = express.Router();
listRoutes.get('/all',  getListAll);
listRoutes.get('/:id', getListID);
listRoutes.post('/', postList);
listRoutes.patch('/', patchList);
listRoutes.delete('/',deleteList );


exports.listRoutes = listRoutes;