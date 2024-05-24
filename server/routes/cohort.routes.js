const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Cohort = require("../models/Cohort.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Create a new cohort
router.post("/api/cohorts", isAuthenticated, (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  const newCohort = {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  };

  Cohort.create(newCohort)
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      next(error);
    });
});

// Get all cohorts with optional filtering
router.get("/api/cohorts", (req, res, next) => {
  const { campus, program } = req.query;
  let filter = {};

  if (campus) {
    filter.campus = campus;
  }
  if (program) {
    filter.program = program;
  }

  Cohort.find(filter)
    .then((listOfCohorts) => {
      res.status(200).json(listOfCohorts);
    })
    .catch((error) => {
      next(error);
    });
});

// Get a cohort by ID
router.get("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohortById) => {
      if (!cohortById) {
        return res.status(404).json({ message: "Cohort not found" });
      }
      res.status(200).json(cohortById);
    })
    .catch((error) => {
      next(error);
    });
});

// Update a cohort by ID
router.put("/api/cohorts/:cohortId", isAuthenticated, (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      if (!updatedCohort) {
        return res.status(404).json({ message: "Cohort not found" });
      }
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      next(error);
    });
});

// Delete a cohort by ID
router.delete("/api/cohorts/:cohortId", isAuthenticated, (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((deletedCohort) => {
      if (!deletedCohort) {
        return res.status(404).json({ message: "Cohort not found" });
      }
      res.status(204).json();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
