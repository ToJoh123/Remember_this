const express = require("express");
const { getFriends } = require("../Controllers/friendsControllers/getFriends");
const {
  getFriendData,
} = require("../Controllers/friendsControllers/getFriendData");
const { getUsers } = require("../Controllers/friendsControllers/getUsers");
const { postFriend } = require("../Controllers/friendsControllers/postFriend");

const friendRoutes = express.Router();
friendRoutes.get("/data", getFriends);
friendRoutes.get("/data/:id", getFriendData);
friendRoutes.get("/users", getUsers);
friendRoutes.post("/users", postFriend);
exports.friendRoutes = friendRoutes;
