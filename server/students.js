const express = require("express");
const router = express.Router();

const Student = require("./models/Student");

// GET all students
router.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// GET one student by ID
router.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// POST create a student
router.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: "Failed to create student" });
  }
});

// DELETE a student by ID
router.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = router;
