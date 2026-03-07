// Devs Team - Import the provided files with JSON data of students and cohorts here:

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

const cohorts = require("./cohorts.json");
const students = require("./students.json");

// INITIALIZE EXPRESS APP
const app = express();

// MONGOOSE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cohort-tools-api";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// MODELS
const User = require("./models/User");
const Cohort = require("./models/Cohort");
const Student = require("./models/Student");
// MIDDLEWARE
// Research Team - Set up CORS middleware here (later):
const cors = require("cors");
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
const jwtMiddleware = require('./middleware/jwt.middleware');

// Protected User Route
app.get('/api/users/:id', jwtMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ _id: user._id, email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
// AUTH ROUTES
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

// GET /docs - Serves API documentation HTML
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "docs.html"));
});

// GET /api/cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const allCohorts = await Cohort.find();
    res.status(200).json(allCohorts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cohorts" });
  }
});

// GET /api/cohorts/:cohortId
app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.status(200).json(cohort);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cohort" });
  }
});

// POST /api/cohorts
app.post("/api/cohorts", async (req, res) => {
  try {
    const createdCohort = await Cohort.create(req.body);
    res.status(201).json(createdCohort);
  } catch (err) {
    res.status(400).json({ error: "Failed to create cohort" });
  }
});

// PUT /api/cohorts/:cohortId
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!updatedCohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.status(200).json(updatedCohort);
  } catch (err) {
    res.status(400).json({ error: "Failed to update cohort" });
  }
});

// DELETE /api/cohorts/:cohortId
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!deletedCohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.status(200).json({ message: "Cohort deleted successfully", deletedCohort });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete cohort" });
  }
});

// GET /api/students
app.get("/api/students", async (req, res) => {
  try {
    const allStudents = await Student.find().populate("cohort");
    res.status(200).json(allStudents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// GET /api/students/:studentId
app.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// GET /api/students/cohort/:cohortId
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const cohortStudents = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.status(200).json(cohortStudents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students for cohort" });
  }
});

// POST /api/students
app.post("/api/students", async (req, res) => {
  try {
    const createdStudent = await Student.create(req.body);
    const populatedStudent = await Student.findById(createdStudent._id).populate("cohort");
    res.status(201).json(populatedStudent);
  } catch (err) {
    res.status(400).json({ error: "Failed to create student" });
  }
});

// PUT /api/students/:studentId
app.put("/api/students/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true }).populate("cohort");
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: "Failed to update student" });
  }
});

// DELETE /api/students/:studentId
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.studentId).populate("cohort");
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully", deletedStudent });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete student" });
  }
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err);
  // If error has a status, use it; otherwise default to 500
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ error: message });
});

// START SERVER
const PORT = 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});