const mongoose = require("mongoose");
require("dotenv/config");
const mongoURI = process.env.MONGO_URI;

const MongoConnect = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to mongodb...");
    })
    .catch((err) => {
      console.error("Connection to mongodb failed ", err);
    });

  process.on("SIGINT", () => {
    mongoose.connection.close();
    console.log("Connection to mongodb closed");
    process.exit(0);
  });
};

module.exports = MongoConnect;
