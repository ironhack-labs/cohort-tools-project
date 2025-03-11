// To insert in "seeds/sohorts.seed.js"
require('dotenv').config()
const mongoose = require("mongoose");

const Student = require("../models/Students.model");

const students = require("../students.json");

  // ... your code here
  mongoose
  .connect(process.env.MONGO_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .then(() => {
    Student.create(students)
      .then((students) => {
        console.log("Students created ->", students);
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error while creating students ->", error);
        mongoose.connection.close();
      });
  })

module.exports = students;