require("dotenv/config");
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const MongoConnect = require("./database/connect");

app.set("view engine", "ejs");

MongoConnect();
app.listen(port, () => {
  console.log(`App listening on port: ${port}...`);
});
