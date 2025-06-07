const router = require('express').Router();
const mongoose = require('mongoose');

const Students = require('../models/students.model');
const Cohorts = require('../models/cohorts.model');

// POST a new student
router.post('/', async (req, res) => {
  const newStudent = new Students(req.body);
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error });
  }
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const allStudents = await Students.find().populate('cohort');
    res.json(allStudents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});
// GET a student by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Students.findById(id).populate('cohort');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// GET students by cohort ID
router.get('/cohort/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  try {
    const students = await Students.find({ cohort: cohortId });
    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found for this cohort' });
    }
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students for cohort' });
  }
});
// PUT to update a student by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStudent = await Students.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error });
  }
});
// DELETE a student by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Students.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student' });
  }
});

// Export the router
module.exports = router;
