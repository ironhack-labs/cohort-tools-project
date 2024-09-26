const { mongoose } = require("mongoose");
const Cohort = require("../models/Cohort.model");
const { isAuthenticated } = require("../middleware/route-gaurd");
const router = require("express").Router();

//POST /api/cohorts - Creates a new cohort
router.post("/", isAuthenticated, (req, res, next) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((newCohort) => {
      res.status(201).json(newCohort);
    })
    .catch((err) => {
      console.error("Failed to add cohort data");
      next(err);
    });
});

//GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get('/', async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (err) {
    console.error("Failed to fetch cohort data");
    next(err);
  }
});

//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get('/:cohortId', async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findById(cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    console.error("Failed to fetch data with id:", cohortId);
    next(err);
  }
});

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put('/:cohortId', isAuthenticated, async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true, runValidators: true });
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    console.error("Failed to update data with id:", cohortId);
    next(err);
  }
});

//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete('/:cohortId', isAuthenticated, async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findByIdAndDelete(cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    console.error("Failed to delete data with id:", cohortId);
    next(err);
  }
});

module.exports = router;