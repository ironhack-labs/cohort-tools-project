const express = require("express");
const router = express.Router();
const Student = require("../models/student.model");

// GET all students with populated cohort
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET tanti STUDENTI (plurale) by cohort ID, with cohort populated
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET one student (SIngolare) by ID con il cohort populate 
router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;