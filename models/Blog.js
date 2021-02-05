const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database");
const User = require("../models/User");
const profile = require("./Profile");

const Blog = db.define("blogs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.STRING,
  },
  article: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  Author: {
    type: DataTypes.STRING,
    model: User,
    Key: "id",
  },
});

module.exports = Blog;
