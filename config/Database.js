const sequelize = require("sequelize");

const db = new sequelize("seadb", "root", "", {
  dialect: "mysql",
  logging: false,
});

module.exports = db;
