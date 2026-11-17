const Cohorts = require("./models/Cohorts-model.js");
const Students = require("./models/Students-model.js");
const express = require("express");
const morgan = require("morgan");
const PORT = 5005;
// const cohorts = require("./cohorts.json")
// const students = require("./students.json")
const cors = require("cors");

const mongoose = require("mongoose");

// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ...
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => {
    console.log("connected to mongodb");
  })

  .catch((error) => {
    console.log("error");
  });

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohorts.find()
    .then((data) => {
      res.json(data);
    })

    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

app.get("/api/students", (req, res) => {
  Students.find()
    .then((data) => {
      res.json(data);
    })

    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
