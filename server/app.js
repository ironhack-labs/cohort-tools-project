const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const app = express();

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173"],
  })
);

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
// Use the CORS middleware with options to allow requests
// from specific IP addresses and domains.

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
  Cohort.find()
    .then((allCohorts) => res.json(allCohorts))
    .catch((err) => console.log(err));
});

app.get("/api/students", (req, res) => {
  Student.find({ program: "Web Dev" })
    .then((allStudents) => res.json(allStudents))
    .catch((err) => console.log(err));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
