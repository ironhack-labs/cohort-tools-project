const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");

router.post("/api/cohorts", async (req, res, next) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  try {
    const cohort = new Cohort({
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      endDate,
      programManager: programManager || "",
      leadTeacher,
      totalHours,
    });
    await cohort.save();
    res.status(201).json(cohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/api/cohorts", async (req, res, next) => {
  const { campus, program } = req.query;

  try {
    let query = {};
    if (campus) query.campus = campus;
    if (program) query.program = program;

    const cohorts = await Cohort.find(query);
    res.status(200).json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/api/cohorts/:cohortId", async (req, res) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  try {
    const cohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      {
        inProgress,
        cohortSlug,
        cohortName,
        program,
        campus,
        endDate,
        programManager: programManager || "",
        leadTeacher,
        totalHours,
      },
      { new: true, runValidators: true }
    );
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json({ message: "Cohort deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
