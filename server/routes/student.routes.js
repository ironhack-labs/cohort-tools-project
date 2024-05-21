const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");

// Create a new student
router.post("/api/students", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;

  try {
    const student = new Student({
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl: linkedinUrl || "",
      languages,
      program,
      background: background || "",
      image: image || "https://i.imgur.com/r8bo8u7.png",
      cohort,
      projects,
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students
router.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get students by cohort
router.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single student by ID
router.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student by ID
router.put("/api/students/:studentId", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl: linkedinUrl || "",
        languages,
        program,
        background: background || "",
        image: image || "https://i.imgur.com/r8bo8u7.png",
        cohort,
        projects,
      },
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a student by ID
router.delete("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
