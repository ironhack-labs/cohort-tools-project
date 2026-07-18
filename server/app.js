const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;

// MODELS
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// MONGOOSE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));


// =========================================================
// ROUTES
// =========================================================

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// --- COHORT ROUTES ---

// GET /api/cohorts - Retrieve all cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    console.error("Error fetching cohorts:", error);
    res.status(500).json({ message: "Failed to retrieve cohorts" });
  }
});

// POST /api/cohorts - Create a new cohort
app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    console.error("Error creating cohort:", error);
    res.status(500).json({ message: "Failed to create cohort" });
  }
});

// GET /api/cohorts/:cohortId - Retrieve a specific cohort by id
app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(200).json(cohort);
  } catch (error) {
    console.error("Error fetching cohort:", error);
    res.status(500).json({ message: "Failed to retrieve cohort" });
  }
});

// PUT /api/cohorts/:cohortId - Update a specific cohort by id
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!updatedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(200).json(updatedCohort);
  } catch (error) {
    console.error("Error updating cohort:", error);
    res.status(500).json({ message: "Failed to update cohort" });
  }
});

// DELETE /api/cohorts/:cohortId - Delete a specific cohort by id
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!deletedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting cohort:", error);
    res.status(500).json({ message: "Failed to delete cohort" });
  }
});


// --- STUDENT ROUTES ---

// GET /api/students - Retrieve all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to retrieve students" });
  }
});

// POST /api/students - Create a new student
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Failed to create student" });
  }
});

// GET /api/students/cohort/:cohortId - Retrieve all students for a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by cohort:", error);
    res.status(500).json({ message: "Failed to retrieve students for this cohort" });
  }
});

// GET /api/students/:studentId - Retrieve a specific student by id
app.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Failed to retrieve student" });
  }
});

// PUT /api/students/:studentId - Update a specific student by id
app.put("/api/students/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Failed to update student" });
  }
});

// DELETE /api/students/:studentId - Delete a specific student by id
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
});


// =========================================================
// START SERVER
// =========================================================
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});