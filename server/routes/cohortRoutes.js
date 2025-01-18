const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort");

// // Cohort Routes

// POST /api/cohorts - Creates a new cohort
router.post("/", async (req, res) => {
  try {
    const newCohort = new Cohort(req.body);
    const savedCohort = await newCohort.save();
    res.status(201).json(savedCohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put("/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    if (!updatedCohort)
      return res.status(404).json({ message: "Cohort not found" });
    res.json(updatedCohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete("/:cohortId", async (req, res) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!deletedCohort)
      return res.status(404).json({ message: "Cohort not found" });
    res.json(deletedCohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
