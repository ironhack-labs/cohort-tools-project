const express = require('express');
const router = express.Router();
const Cohort = require("../models/cohort");

// Get all cohorts
router.get('/', async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get cohort by ID
router.get('/:cohortId', async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) return res.status(404).json({ msg: 'Cohort not found' });
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create new cohort
router.post('/', async (req, res) => {
  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body;

  try {
    const newCohort = new Cohort({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours });
    await newCohort.save();
    res.json(newCohort);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update cohort by ID
router.put('/:cohortId', async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    res.json(updatedCohort);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete cohort by ID
router.delete('/:cohortId', async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ msg: 'Cohort deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
