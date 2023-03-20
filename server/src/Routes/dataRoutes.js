const express = require("express");
const { getData } = require("../Controllers/dataControllers/getData");
const dataRoutes = express.Router();
dataRoutes.get("/", getData);
exports.dataRoutes = dataRoutes;
