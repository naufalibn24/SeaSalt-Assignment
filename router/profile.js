const express = require("express");
const ProfileController = require("../controller/profile");
const routes = express.Router();
const upload = require("../middleware/multer");
const authentication = require("../middleware/authentication");

routes.post(
  "/create",
  authentication,
  upload.single("images"),
  ProfileController.UserProfile
);

routes.patch(
  "/picture",
  authentication,
  upload.single("images"),
  ProfileController.imageProfile
);

module.exports = routes;
