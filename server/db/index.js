const mongoose = require("mongoose");
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cohorts-db";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "cohorths-db"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
