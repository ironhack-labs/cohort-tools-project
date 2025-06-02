const express = require("express");
const Cohort = require("../models/cohort.model");
const router = express.Router();

//GET cohorts
router.get("/api/cohorts", async (_, res, next) => {
  try {
    const cohorts = await Cohort.find();
    console.log("Retrieved cohorts", cohorts);
    res.json(cohorts);
  } catch (error) {
    console.log("Error retrieving cohorts", error);
  }
});

//GET cohort by id
router.get("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    const foundCohort = await Cohort.findById(cohortId);
    console.log("Cohort retrieved", foundCohort);
    res.status(200).json(foundCohort);
  } catch (error) {
    console.log("Error retrieving cohort", error);
    res.status(500).json({ error: "Could not retrieve cohort" });
  }
});
//POST cohort
router.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create({
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
    });
    console.log("New cohort created", newCohort);
    res.status(201).json(newCohort);
  } catch (error) {
    console.log("Error when creating cohort", error);
    res.status(500).json({ error: "Could not create cohort" });
  }
});
//PUT cohort
router.put("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, {
      new: true,
    });
    console.log("Cohort updated", updatedCohort);
    res.status(200).json(updatedCohort);
  } catch (error) {
    console.log("Error updating cohort", error);
    res.status(500).json({ error: "Failed to update cohort" });
  }
});

//DELETE cohort by id
router.delete("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    await Cohort.findByIdAndDelete(cohortId);
    res.status(204).send();
  } catch (error) {
    console.log("Error deleting cohort", error);
    res.status(500).json({ error: "Failed to delete cohort" });
  }
});

module.exports = router;
