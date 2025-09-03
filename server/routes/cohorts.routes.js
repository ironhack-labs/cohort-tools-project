const router = require('express').Router();
const Cohort = require('../models/Cohort.model');

// Create new cohort
router.post('/', async (req, res, next) => {
  try {
    const doc = await Cohort.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

// Get all cohorts
router.get('/', async (req, res, next) => {
  try {
    const docs = await Cohort.find();
    res.json(docs);
  } catch (e) { next(e); }
});

// Get specific cohort
router.get('/:cohortId', async (req, res, next) => {
  try {
    const doc = await Cohort.findById(req.params.cohortId);
    res.json(doc);
  } catch (e) { next(e); }
});

// Update cohort
router.put('/:cohortId', async (req, res, next) => {
  try {
    const doc = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.json(doc);
  } catch (e) { next(e); }
});

// Delete cohort
router.delete('/:cohortId', async (req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ message: 'Cohort deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
