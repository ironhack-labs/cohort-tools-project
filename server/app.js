const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;

// STATIC DATA
const students = require("./students.json");
const cohorts = require("./cohorts.json");

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

// ⭐ GET one student by ID
app.get("/api/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
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
