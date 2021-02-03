const express = require("express");
const routes = express.Router();
const UserController = require("../controller/user");
const SMTPemail = require("../helper/nodeMailer");

routes.post("/register", UserController.register,SMTPemail._idActivation);
routes.get("/test",SMTPemail._idActivation)
routes.post("/login",UserController.login)

module.exports = routes;
