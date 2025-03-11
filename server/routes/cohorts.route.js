const router = require('express').Router();
const Cohort = require('../models/cohorts.models.js');

// Get 
router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create 
router.post("/", async (req, res) => {
  try {
    const newCohort = new Cohort(req.body);
    await newCohort.save();
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get cohort by ID
router.get("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cohort by ID
router.put("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete cohort by ID
router.delete("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json({ message: "Cohort deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
