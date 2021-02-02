const express = require("express");
const routes = express.Router();
const errorHandler = require("../middleware/Errorhandler");
const userRoutes = require("./user");

routes.use("/users", userRoutes);
routes.use(errorHandler);

module.exports = routes;
