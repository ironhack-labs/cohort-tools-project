const router = require('express').Router();
const Student = require('../models/Student.model');

// Create new student
router.post('/', async (req, res, next) => {
  try {
    const doc = await Student.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

// Get all students (with cohort populated)
router.get('/', async (req, res, next) => {
  try {
    const docs = await Student.find().populate('cohort');
    res.json(docs);
  } catch (e) { next(e); }
});

// Get all students in a cohort
router.get('/cohort/:cohortId', async (req, res, next) => {
  try {
    const docs = await Student.find({ cohort: req.params.cohortId })
                              .populate('cohort');
    res.json(docs);
  } catch (e) { next(e); }
});

// Get specific student
router.get('/:studentId', async (req, res, next) => {
  try {
    const doc = await Student.findById(req.params.studentId).populate('cohort');
    if (!doc) return res.status(404).json({ error: 'Student not found' });
    res.json(doc);
  } catch (e) { next(e); }
});


// Update student
router.put('/:studentId', async (req, res, next) => {
  try {
    const doc = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.json(doc);
  } catch (e) { next(e); }
});

// Delete student
router.delete('/:studentId', async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: 'Student deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
