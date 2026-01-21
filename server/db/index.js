const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Database: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
