const router = require('express').Router();
const Cohort = require('../models/Cohort');
const CustomError = require('../error-handling/CustomError');

// GET /api/cohorts - Retrieve all cohorts

// Cohort Routes

router.get("/", async (req, res, next) => {
  // Return list of cohorts
  // res.status(200).json(cohortsData);
  // res.sendFile(path.join(__dirname, "data", "cohorts.json"));
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    next(new CustomError("Error retrieving cohorts", 500));
  }
});

router.post("/", async (req, res, next) => {
  // Create a new cohort
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    next(new CustomError("Error creating cohort", 500));
  }
});

router.get("/:id", async (req, res, next) => {
  // Return a specific cohort by ID
  try {
    const cohort = await Cohort.findById(req.params.id);
    if (!cohort) {
      return next(new CustomError("Cohort not found", 404));
    }
    res.status(200).json(cohort);
  } catch (error) {
    next(new CustomError("Error retrieving cohort", 500));
  }
});

router.put("/:id", async (req, res, next) => {
  // Update a specific cohort by ID
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCohort) {
      return next(new CustomError("Cohort not found", 404));
    }
    res.status(200).json(updatedCohort);
  } catch (error) {
    next(new CustomError("Error updating cohort", 500));
  }
});

router.delete("/:id", async (req, res, next) => {
  // Delete a specific cohort by ID
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.id);
    if (!deletedCohort) {
      return next(new CustomError("Cohort not found", 404));
    }
    res.status(200).json({ message: "Cohort deleted successfully" });
  } catch (error) {
    next(new CustomError("Error deleting cohort", 500));
  }
});

module.exports = router;