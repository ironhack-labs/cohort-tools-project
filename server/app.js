const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;

const Cohort = require("./models/CohortModel");
const Student = require("./models/StudentModel");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const cohortData = require("./cohorts.json");
const studentData = require("./students.json");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.status(201).json(cohorts);
  } catch {
    res.status(500).json({ message: "Error fetching cohorts" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(201).json(students);
  } catch {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
