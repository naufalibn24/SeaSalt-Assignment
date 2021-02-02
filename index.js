const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/Database");
const app = express();
const routes = require("./router/routes");
require("dotenv").config();

const port = 3000;

db.authenticate().then(() =>
  console.log("Connection with database are success")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
