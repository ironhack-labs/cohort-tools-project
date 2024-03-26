const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json");
const students = require("./students.json");

const Student = require("../models/students.model");
const Cohort = require("../models/cohort.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//MONGOOSE
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/miniproject_DB")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("found students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error finding students ->", error);
      res.status(500).send({ error: "Lost students" });
    });
});

app.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("found cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error finding cohorts ->", error);
      res.status(500).send({ error: "Lost cohorts" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
