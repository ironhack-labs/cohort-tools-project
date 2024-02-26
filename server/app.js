const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = 5005;
const cohortSchema = require("./models/cohort");
const studentSchema = require("./models/student");

const cohorts = require("./cohorts.json");
const students = require("./students.json");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
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

app.get("/api/cohorts", async (req, res) => {
  res.json(await cohortSchema.find());
});

app.get("/api/students", async (req, res) => {
  res.json(await studentSchema.find());
});

// START SERVER
app.listen(PORT, async () => {
  mongoose.set("strictQuery", true);
  // ? connecting to mongo
  await mongoose.connect("mongodb://localhost:27017/cohort-tools-api");

  console.log(`Server listening on port ${PORT}`);
});
