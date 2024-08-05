const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model"); 

// POST /api/cohorts - Creates a new cohort
router.post("/cohorts", (req, res, next) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      console.log("Cohort created ->", createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      console.error("Error while creating the cohort ->", error);
      error.message = "Failed to create cohort";
      error.status = 500;
      next(error);
    });
});

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get("/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      error.message = "Failed to retrieve cohorts";
      error.status = 500;
      next(error);
    });
});

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;

  Cohort.findById(cohortId)
    .then((cohort) => {
      if (cohort) {
        console.log("Retrieved cohort ->", cohort);
        res.json(cohort);
      } else {
        const error = new Error("Cohort not found");
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving cohort ->", error);
      error.message = "Failed to retrieve cohort";
      error.status = 500;
      next(error);
    });
});

// PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Updated cohort ->", updatedCohort);
      res.status(204).json(updatedCohort);
    })
    .catch((error) => {
      console.error("Error while updating cohort ->", error);
      error.message = "Failed to update cohort";
      error.status = 500;
      next(error);
    });
});

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete("/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((result) => {
      if (result) {
        console.log("Cohort deleted!");
        res.status(204).send();
      } else {
        const error = new Error("Cohort not found");
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while deleting Cohort ->", error);
      error.message = "Deleting Cohort failed";
      error.status = 500;
      next(error);
    });
});

module.exports = router;