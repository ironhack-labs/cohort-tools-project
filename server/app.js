const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = 5005;
const cohortSchema = require("./models/cohort");
const studentSchema = require("./models/student");
const cohort = require("./models/cohort");
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
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", async (req, res) => {
  res.json(await cohortSchema.find());
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const cohort = await cohortSchema.findById(cohortId);
    res.json(cohort);
  } catch (err) {
    console.log("error is=>>>>", err);
  }
});
app.post("/api/cohorts", async (req, res) => {
  const cohort = req.body;
  const newCohort = new cohortSchema(cohort);
  await newCohort.save();
  res.json(newCohort);
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const cohortData = req.body;
    const updateCohort = await cohortSchema.findByIdAndUpdate(
      cohortId,
      cohortData
    );
    res.json(updateCohort);
  } catch (err) {
    console.log("error is=>>>>", err);
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const deleteCohort = await cohortSchema.findByIdAndDelete(cohortId);
    res.json(deleteCohort);
  } catch (err) {
    console.log("error is=>>>>", err);
  }
});

app.get("/api/students", async (req, res) => {
  res.json(await studentSchema.find());
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await studentSchema.findById(studentId);
    res.json(student);
  } catch (err) {
    console.log("error is=>>>>", err);
  }
});

app.post("/api/students", async (req, res) => {
  /*
  one way
  const student = new studentSchema({
    _id:req.body._id
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects,
  });
  */
  //easier way
  const student = req.body;
  const newStudent = new studentSchema(student);
  await newStudent.save();
  res.json(newStudent);
});

// START SERVER
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
