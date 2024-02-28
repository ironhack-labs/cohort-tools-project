require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { PORT = 5005 } = process.env;
const cohortSchema = require("./models/cohort");
const studentSchema = require("./models/student");

/*
old JSON DATA
 const cohorts = require("./cohorts.json");
 const students = require("./students.json");
*/
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

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then((res) => {
    console.log("connected to mongoDB cohort-tools-api");
  })
  .catch((err) => {
    console.log(err);
  });
// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res, next) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", async (req, res, next) => {
  try {
    res.json(await cohortSchema.find());
  } catch (err) {
    next(err);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const cohort = await cohortSchema.findById(cohortId);
    res.json(cohort);
  } catch (err) {
    next(err);
  }
});

app.post("/api/cohorts", async (req, res, next) => {
  try {
    const cohort = req.body;
    const newCohort = new cohortSchema(cohort);
    await newCohort.save();
    res.json(newCohort);
  } catch (err) {
    next(err);
  }
});

app.put("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const cohortData = req.body;
    const updateCohort = await cohortSchema.findByIdAndUpdate(
      cohortId,
      cohortData
    );
    res.json(updateCohort);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const deleteCohort = await cohortSchema.findByIdAndDelete(cohortId);
    res.json(deleteCohort);
  } catch (err) {
    next(err);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    res.json(await studentSchema.find());
  } catch (err) {
    next(err);
  }
});

app.get("/api/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await studentSchema.findById(studentId);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    const student = req.body;
    const newStudent = new studentSchema(student);
    await newStudent.save().catch(next);
    res.json(newStudent);
  } catch (err) {
    next(err);
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  const { cohortId } = req.params;

  try {
    const students = await studentSchema
      .find({ cohort: cohortId })
      .populate("cohort");
    res.json(students);
  } catch (err) {
    next(err);
  }
});

app.put("/api/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const studentData = req.body;
    const student = await studentSchema.findByIdAndUpdate(
      studentId,
      studentData
    );
    res.json(student);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await studentSchema.findByIdAndDelete(studentId);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// ? error handler
app.use((err, req, res, next) => {
  console.log("err", err);
  res.status(500).send("Smth was wrong");
});

// START SERVER
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
