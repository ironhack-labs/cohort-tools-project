const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => {
    console.log("connected to mongodb");
  })

  .catch((error) => {
    console.log("error");
  });