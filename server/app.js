require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorHandler = require("./error-handler");
const authRoutes = require("./routes/auth.routes");
const PORT = 5005;

// DB CONNECTION
require("./mongoose-connection");

// MODELS
const Student = require("./models/Student");
const Cohort = require("./models/Cohort");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// AUTH ROUTES
app.use("/auth", authRoutes);

// ROUTES

// Serve static HTML documentation
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENT ROUTES
app.get("/api/students", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (err) {
    next(err);
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const students = await Student.find({ cohort: cohortId }).populate("cohort");
    res.json(students);
  } catch (err) {
    next(err);
  }
});

app.get("/api/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("cohort");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

app.put("/api/students/:studentId", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/students/:studentId", async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: "Student deleted" });
  } catch (err) {
    next(err);
  }
});

// COHORT ROUTES
app.get("/api/cohorts", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    next(err);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    next(err);
  }
});

app.post("/api/cohorts", async (req, res, next) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (err) {
    next(err);
  }
});

app.put("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.json(updatedCohort);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ message: "Cohort deleted" });
  } catch (err) {
    next(err);
  }
});

// ERROR HANDLER
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
