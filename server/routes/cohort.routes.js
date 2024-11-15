const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model.js");

// Get all cohorts
router.get("/api/cohorts", (req, res, next) => {
    Cohort.find()
        .then(cohorts => res.json(cohorts))
        .catch(err => next(err));
});

// Get a specific cohort by ID
router.get("/api/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;

    Cohort.findById(cohortId)
        .then(cohort => res.json(cohort))
        .catch(err => next(err));
});

// Create a new cohort
router.post("/api/cohorts", (req, res, next) => {
    const newCohort = req.body;

    Cohort.create(newCohort)
        .then(cohort => res.status(201).json(cohort))
        .catch(err => next(err));
});

// Update a cohort by ID
router.put("/api/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    const newDetails = req.body;

    Cohort.findByIdAndUpdate(cohortId, newDetails, { new: true })
        .then(cohort => res.json(cohort))
        .catch(err => next(err));
});

// Delete a cohort by ID
router.delete("/api/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;

    Cohort.findByIdAndDelete(cohortId)
        .then(cohort => res.json(cohort))
        .catch(err => next(err));
});

module.exports = router;





