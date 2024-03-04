const express = require('express');
const router = express.Router();

const Cohort = require("../models/Cohorts.model.js")

router.post("/cohorts", async (req, res, next) => {
    const {
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours,
    } = req.body;
    try {
      const newCohort = await Cohort.create({
        inProgress,
        cohortSlug,
        cohortName,
        program,
        campus,
        startDate,
        endDate,
        programManager,
        leadTeacher,
        totalHours,
      });
      res.status(201).json(newCohort);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  router.get("/cohorts", (req, res, next) => {
    Cohort.find({})
      .then((cohorts) => {
        console.log("Retrieved cohorts ->", cohorts);
        res.json(cohorts);
      })
      .catch((error) => {
        console.error("Error while retrieving cohorts", error);
        res.status(500).json({ error: "Failed to retrieve cohorts" });
        next(error);
      });
  });
  
  router.get("/cohorts/:id", async (req, res, next) => {
    const cohortId = req.params.id;
    Cohort.findById(cohortId)
      .then((cohort) => {
        res.status(200).json(cohort);
      })
      .catch((error) => {
        console.error("Error while retrieving cohorts", error);
        res.status(500).json({ error: "Failed to retrieve cohorts" });
        next(error);
      });
  });
  
  router.put("/cohorts/:id", (req, res, next) => {
    const cohortId = req.params.id;
  
    Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
      .then((updatedCohort) => {
        res.status(200).json(updatedCohort);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error" });
        next(error);
      });
  });
  
  router.delete("/cohorts/:cohortId", async (req, res, next) => {
    try {
      const { cohortId } = req.params;
      const cohort = await Cohort.findByIdAndDelete(cohortId);
      res.status(200).json(cohort);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;