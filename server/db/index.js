const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/cohort-tools-api")
.then(() => {
  console.log("connected to the database, yay!")
})
.catch(() => {
  console.log("error connecting to the database")
})