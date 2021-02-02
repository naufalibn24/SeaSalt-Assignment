const sequelize = require("sequelize");

const db = new sequelize("sea_db", "root", "", {
  dialect: "mysql",
  logging: false,
});

db.sync({});

module.exports = db;
