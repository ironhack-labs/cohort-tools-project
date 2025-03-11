// To insert in "seeds/sohorts.seed.js"
require('dotenv').config()
const mongoose = require("mongoose");

const Cohort = require("../models/Cohorts.model");

const cohorts = require("../cohorts.json");

  // ... your code here
  mongoose
  .connect(process.env.MONGO_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .then(() => {
    Cohort.create(cohorts)
      .then((cohorts) => {
        console.log("Cohorts created ->", cohorts);
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error while creating cohorts ->", error);
        mongoose.connection.close();
      });
  })

module.exports = cohorts;