require("dotenv/config");
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const MongoConnect = require("./database/connect");
const movieRouter = require("./routes/moviesRoute");

app.set("view engine", "ejs");
app.use(express.json());

app.use("/", movieRouter);

MongoConnect();
app.listen(port, () => {
  console.log(`App listening on port: ${port}...`);
});
