const express = require("express");
const { getFriends } = require("../Controllers/friendsControllers/getFriend");
const { getUsers } = require("../Controllers/friendsControllers/getUsers");

const friendRoutes = express.Router();
friendRoutes.get("/", getFriends);
friendRoutes.get("/users", getUsers);
exports.friendRoutes = friendRoutes;
