const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('cohort');
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get students by cohort ID

router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;  // Get studentId from the URL parameter

  try {
    // Find student by ID
    const student = await Student.findById(studentId).populate("cohort");

    // If student not found
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Respond with the student data
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
// Create new student
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body;

  try {
    const newStudent = new Student({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects });
    await newStudent.save();
    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update student by ID
router.put('/:studentId', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete student by ID
router.delete('/:studentId', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
