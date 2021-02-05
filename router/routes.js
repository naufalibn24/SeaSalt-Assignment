const express = require("express");
const routes = express.Router();
const errorHandler = require("../middleware/Errorhandler");
const userRoutes = require("./user");
const blogRoutes = require("./blog");
const profileRoutes = require("./profile");
const authorization = require("../middleware/authorization");

routes.use("/users", userRoutes);
routes.use("/blog", blogRoutes);
routes.use(authorization);
routes.use("/profile", profileRoutes);
routes.use(errorHandler);

module.exports = routes;
