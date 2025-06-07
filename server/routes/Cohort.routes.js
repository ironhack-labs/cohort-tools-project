const router = require('express').Router();
const mongoose = require('mongoose');
const Cohorts = require('../models/cohorts.model');

// POST a new cohort
router.post('/', async (req, res) => {
  const newCohort = new Cohorts(req.body);
  try {
    const savedCohort = await newCohort.save();
    res.status(201).json(savedCohort);
  } catch (error) {
    res.status(400).json({ message: 'Error creating cohort', error });
  }
});

// GET all cohorts
router.get('/', async (req, res) => {
  try {
    const allCohorts = await Cohorts.find();
    res.json(allCohorts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cohorts' });
  }
});

// GET a cohort by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await Cohorts.findById(id);
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cohort' });
  }
});

// PUT to update a cohort by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCohort = await Cohorts.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }
    res.json(updatedCohort);
  } catch (error) {
    res.status(400).json({ message: 'Error updating cohort', error });
  }
});

// DELETE a cohort by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCohort = await Cohorts.findByIdAndDelete(id);
    if (!deletedCohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }
    res.json({ message: 'Cohort deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cohort', error });
  }
});

// Export the router
module.exports = router;
