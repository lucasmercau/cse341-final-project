require("dotenv/config");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const port = process.env.PORT || 5000;
const MongoConnect = require("./database/connect");

app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_KEY,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use("/", require("./routes"));

MongoConnect();

app.listen(port, () => {
  console.log(`App listening on port: ${port}...`);
});
