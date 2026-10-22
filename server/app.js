const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5005;

// STATIC DATA
const students = require("./students.json");
const cohorts = require("./cohorts.json");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES


const MONGODB_URI = "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ⭐ API Docs (HTML)
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// ⭐ GET all students (mock JSON)
app.get("/api/students", (req, res) => {
  res.json(students);
});

// ⭐ GET all cohorts (mock JSON)
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students by cohort" });
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student" });
  }
});


// ⭐ GET one student by ID
app.get("/api/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(500).json({ message: "Error creating cohort" });
  }
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cohorts" });
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cohort" });
  }
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const updated = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating cohort" });
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ message: "Cohort deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cohort" });
  }
});


// ⭐ GET one cohort by ID
app.get("/api/cohorts/:id", (req, res) => {
  const cohort = cohorts.find((c) => c.id === Number(req.params.id));

  if (!cohort) {
    return res.status(404).json({ message: "Cohort not found" });
  }

  res.json(cohort);
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
