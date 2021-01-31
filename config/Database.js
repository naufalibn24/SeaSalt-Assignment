const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sea_db",
  port: "3306",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected with MySql");
});

module.exports = conn;
