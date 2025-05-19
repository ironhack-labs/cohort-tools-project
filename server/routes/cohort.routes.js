const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Student = require("../models/Student");
const Cohort = require("../models/Cohort");


// COHORTS ROUTES
// POST - Create a new cohort
router.post("/cohorts", (req, res, next) => {
    const newCohort = req.body;

    Cohort.create(newCohort)
        .then(savedCohort => res.status(201).json(savedCohort))
        .catch(err => res.status(400).json({ error: err.message }));
});

// GET - Get all cohorts
router.get("/cohorts", (req, res) => {

    Cohort.find({})
        .then(cohorts => res.json(cohorts))
        .catch(err => res.status(500).json({ error: err.message }));
});

// GET - Get a cohort by ID
router.get('/cohorts/:id', (req, res) => {
    const { id } = req.params;

    Cohort.findById(id)
        .then(cohort => {
            if (!cohort) {
                return res.status(404).json({ message: "Cohort not found" });
            }
            res.json(cohort);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// PUT - Update a cohort by ID
router.put('/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    Cohort.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedCohort => {
            if (!updatedCohort) {
                return res.status(404).json({ message: "Cohort not found" });
            }
            res.json(updatedCohort);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE - Delete a cohort by ID
router.delete('/cohorts/:id', (req, res) => {
    const { id } = req.params;

    Cohort.findByIdAndDelete(id)
        .then(deletedCohort => {
            if (!deletedCohort) {
                return res.status(404).json({ message: "Cohort not found" });
            }
            res.json({ message: "Cohort deleted successfully" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});



module.exports = router;