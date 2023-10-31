const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
  })
);

// ...
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

const Cohort = require("./models/Cohort.model");

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      res.json(cohorts);
      console.log(cohorts);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send({ error: "failed to retrieve cohorts" });
    });
});

const Student = require("./models/Student.model");
app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send({ error: "failed to retrieve students" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
