const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Student = require("../models/Student");
const Cohort = require("../models/Cohort");




// STUDENTS ROUTES
// POST - Create a new student
router.post('/students', (req, res) => {
    const newStudent = req.body;

    Student.create(newStudent)
        .then(savedStudent => res.status(201).json(savedStudent))
        .catch(err => res.status(400).json({ error: err.message }));
});

// GET - Get all students
router.get('/students', (req, res) => {
    Student.find({})
        .populate('cohort')
        .then(students => res.json(students))
        .catch(err => res.status(500).json({ error: err.message }));
});

// GET - Get all students for one cohort
router.get('/students/cohort/:cohortId', (req, res) => {
    const { cohortId } = req.params;

    Student.find({ cohort: cohortId })
        .populate('cohort')
        .then(students => {
            res.json(students);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// GET - Get a student by ID
router.get('/students/:id', (req, res) => {
    const { id } = req.params;

    Student.findById(id)
        .populate('cohort')
        .then(student => {
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(student);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// PUT - Update a student by ID
router.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    Student.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedStudent => {
            if (!updatedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(updatedStudent);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE - Delete a student by ID
router.delete('/students/:id', (req, res) => {
    const { id } = req.params;

    Student.findByIdAndDelete(id)
        .then(deletedStudent => {
            if (!deletedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json({ message: "Student deleted successfully" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


//

module.exports = router;