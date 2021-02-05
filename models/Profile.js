const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database");
const User = require("../models/User");
const Blog = require("./Blog");

const profile = db.define("profile", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.STRING,
    references: "users",
    referencesKey: "userId",
  },
});

module.exports = profile;
