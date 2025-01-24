const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// GET / - Retrieve all students from the database
router.get('/', async (req, res, next) => {
    try {
        const students = await Student.find().populate('cohort');
        res.json(students);
    } catch (err) {
        next(err);
    }
});

// POST / - Creates a new student
router.post('/', async (req, res, next) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        next(err);
    }
});

// GET /:studentId - Retrieve a specific student by ID
router.get('/:studentId', async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('cohort');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        next(err);
    }
});

// PUT /:studentId - Updates a specific student by ID
router.put('/:studentId', async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (err) {
        next(err);
    }
});

// DELETE /:studentId - Deletes a specific student by ID
router.delete('/:studentId', async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
