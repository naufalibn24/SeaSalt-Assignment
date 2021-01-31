const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./config/Database");
const app = express();

const port = 3000;

conn;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
