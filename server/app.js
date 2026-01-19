const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const { error500 } = require("./error-handling/errorHandling");

require("dotenv").config();

// Import the model
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tool-db")
  .then((x) => console.log(`Connected to Database`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// ROUTES

// Cohorts routes
app.post(`/api/cohorts`, (req, res, next) => {
  Cohort.create(req.body)
    .then((cohort) => {
      console.log("New cohort created", cohort);
      res.status(201).json(cohort);
    })
    .catch(next);
});

app.get(`/api/cohorts`, (req, res, next) => {
  Cohort.find({})
    .then((cohort) => {
      console.log("retrieve Cohorts", cohort);
      res.json(cohort);
    })
    .catch(next);
});

app.get(`/api/cohorts/:cohortId`, async (req, res, next) => {
  try {
    const oneCohort = await Cohort.findById(req.params.cohortId);
    console.log("retrieve one Cohort", oneCohort);
    res.status(200).json(oneCohort);
  } catch (error) {
    next(error);
  }
});

app.put(`/api/cohorts/:cohortId`, (req, res, next) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Cohort updated", updatedCohort);
      res.status(200).json(updatedCohort);
    })
    .catch(next);
});

app.delete(`/api/cohorts/:cohortId`, (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((data) => {
      console.log("Cohort deleted", data);
      res.status(200).json(data);
    })
    .catch(next);
});

// Students routes

app.post(`/api/students`, (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      console.log("New student created", student);
      res.status(201).json(student);
    })
    .catch(next);
});

app.get(`/api/students`, (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("retrieve Students", students);
      res.json(students);
    })
    .catch(next);
});

app.get(`/api/students/cohort/:cohortId`, async (req, res, next) => {
  try {
    const studentsInCohort = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    console.log("retrieve Students in Cohort", studentsInCohort);
    res.status(200).json(studentsInCohort);
  } catch (error) {
    next(error);
  }
});

app.get(`/api/students/:studentId`, async (req, res, next) => {
  try {
    const oneStudent = await Student.findById(req.params.studentId).populate(
      "cohort",
    );
    console.log("retrieve one Student", oneStudent);
    res.status(200).json(oneStudent);
  } catch (error) {
    next(error);
  }
});

app.put(`/api/students/:studentId`, (req, res, next) => {
  const { studentId } = req.params;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Student updated", updatedStudent);
      res.status(200).json(updatedStudent);
    })
    .catch(next);
});

app.delete(`/api/students/:studentId`, (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((data) => {
      console.log("Student deleted", data);
      res.status(200).json(data);
    })
    .catch(next);
});

// Here is the handling routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Pas cablé
const taskRouter = require("./routes/user.routes");
app.use("/api", taskRouter);

app.use(error500);
// START SERVER
app.listen(3000, () => console.log("App listening on port 3000!"));
