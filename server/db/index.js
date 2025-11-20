const mongoose = require("mongoose")

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api") // 127.0.0.1 same as localhost
  .then(() => {
    console.log("data base connected");
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = mongoose