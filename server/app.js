const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Import the custom error handling middleware:
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

const Student = require("./Models/Student.model");
const Cohort = require("./Models/Cohort.model");

const PORT = 5005;

// DB CONNECTION
mongoose
  .connect(
    "mongodb+srv://Arthur:adminDB1@cohortdb1.4dzw3wo.mongodb.net/cohort-tools-api?retryWrites=true&w=majority"
  )
  .then((x) => console.log(`Connected to MongoDB: "${x.connections[0].name}"`))
  .catch((err) => console.error("MongoDB connection error:", err));

// APP
const app = express();

// MIDDLEWARE
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// DOCS
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENT ROUTES

app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.json(student);
  } catch (err) {
    res.status(404).json({ error: "Student not found" });
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// COHORT ROUTES
app.post("/api/cohorts", async (req, res) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    res.json(cohort);
  } catch (err) {
    res.status(404).json({ error: "Cohort not found" });
  }
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.json(updatedCohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE COHORT
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);

// SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
