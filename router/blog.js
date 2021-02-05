const express = require("express");
const routes = express.Router();
const BlogController = require("../controller/blog");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const upload = require("../middleware/multer");

routes.get("/view/:id", BlogController.getOne);
routes.get("/views/author", BlogController.getSpecific);
routes.get("/views/all", BlogController.pagingfilteringsorting);
routes.post(
  "/create",
  authentication,
  authorization,
  upload.single("images"),
  BlogController.Create
);
routes.put("/update/:id", authentication, authorization, BlogController.update);
routes.delete(
  "/delete/:id",
  authentication,
  authorization,
  BlogController.delete
);

module.exports = routes;
