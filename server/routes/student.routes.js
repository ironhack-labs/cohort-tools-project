const express = require('express');
const router = express.Router();
const Student = require("../models/Student.model.js");

// Get all students
router.get("/api/students", (req, res, next) => {
    Student.find({})
        .then(students => res.json(students))
        .catch(err => next(err));
});



// Get all students of a specified cohort
router.get("/api/students/cohort/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;

    Student.find({ cohort: cohortId })
        .populate("cohort")
        .then(students => res.json(students))
        .catch(err => next(err));
});

// Get a specific student by ID
router.get("/api/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;

    Student.findById(studentId)
        .populate("cohort")
        .then(student => {
            if (!student) {
                const error = new Error("Student not found");
                error.status = 404;
                throw error;
            }
            res.json(student);
        })
        .catch(err => next(err));
});

// Create a new student
router.post("/api/students", (req, res, next) => {
    const newStudent = req.body;

    Student.create(newStudent)
        .then(student => res.status(201).json(student))
        .catch(err => next(err));
});

// Update a student by ID
router.put("/api/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    const newDetails = req.body;

    Student.findByIdAndUpdate(studentId, newDetails, { new: true })
        .then(studentFromDB => {
            if (!studentFromDB) {
                const error = new Error("Student not found");
                error.status = 404;
                throw error;
            }
            res.json(studentFromDB);
        })
        .catch(err => next(err));
});

// Delete a student by ID
router.delete("/api/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;

    Student.findByIdAndDelete(studentId)
        .then(response => {
            if (!response) {
                const error = new Error("Student not found");
                error.status = 404;
                throw error;
            }
            res.json(response);
        })
        .catch(err => next(err));
});

module.exports = router;