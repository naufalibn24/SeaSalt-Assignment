const express = require("express");
const routes = express.Router();
const UserController = require("../controller/user");

routes.post("/register", UserController.register);

module.exports = routes;
