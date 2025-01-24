const express = require('express');
const router = express.Router();
const Cohort = require('../models/cohort');

// GET / - Retrieve all cohorts from the database
router.get('/', async (req, res, next) => {
    try {
        const cohorts = await Cohort.find();
        res.json(cohorts);
    } catch (err) {
        next(err);
    }
});

// POST / - Creates a new cohort
router.post('/', async (req, res, next) => {
    try {
        const newCohort = new Cohort(req.body);
        await newCohort.save();
        res.status(201).json(newCohort);
    } catch (err) {
        next(err);
    }
});

// GET /:cohortId - Retrieve a specific cohort by ID
router.get('/:cohortId', async (req, res, next) => {
    try {
        const { cohortId } = req.params;
        const cohort = await Cohort.findById(cohortId);
        if (!cohort) {
            return res.status(404).json({ message: 'Cohort not found' });
        }
        res.json(cohort);
    } catch (err) {
        next(err);
    }
});

// PUT /:cohortId - Updates a specific cohort by ID
router.put('/:cohortId', async (req, res, next) => {
    try {
        const { cohortId } = req.params;
        const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });
        if (!updatedCohort) {
            return res.status(404).json({ message: 'Cohort not found' });
        }
        res.json(updatedCohort);
    } catch (err) {
        next(err);
    }
});

// DELETE /:cohortId - Deletes a specific cohort by ID
router.delete('/:cohortId', async (req, res, next) => {
    try {
        const { cohortId } = req.params;
        const deletedCohort = await Cohort.findByIdAndDelete(cohortId);
        if (!deletedCohort) {
            return res.status(404).json({ message: 'Cohort not found' });
        }
        res.json({ message: 'Cohort deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
