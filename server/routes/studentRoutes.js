const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // Ensure the correct model path

// Middleware to log incoming requests
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// POST /api/students - Creates a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error creating student:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/students - Retrieves all students
router.get("/", async (req, res) => {
    try {
      const students = await Student.find().populate("cohort"); // Fetch students and populate cohort details
      res.json(students);
    } catch (err) {
      console.error("Error fetching students:", err.message); // Log backend errors
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

// GET /api/students/cohort/:cohortId - Retrieves all students for a specific cohort
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.json(students);
  } catch (err) {
    console.error("Error fetching students by cohort:", err.message);
    res.status(500).json({ error: "Error fetching students by cohort" });
  }
});

// GET /api/students/:studentId - Retrieves a specific student by ID
router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("Error fetching student:", err.message);
    res.status(500).json({ error: "Error fetching student" });
  }
});

// PUT /api/students/:studentId - Updates a specific student by ID
router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (err) {
    console.error("Error updating student:", err.message);
    res.status(400).json({ error: "Error updating student" });
  }
});

// DELETE /api/students/:studentId - Deletes a specific student by ID
router.delete("/:studentId", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err.message);
    res.status(500).json({ error: "Error deleting student" });
  }
});

module.exports = router;
