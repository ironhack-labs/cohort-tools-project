const router = require("express").Router();

const Cohort = require("../models/Cohort.model.js");

// COHORT RESOURCE ROUTES
// POST /api/cohorts
router.post("/api/cohorts", (req, res, next) => {
  const newCohort = req.body;

  Cohort.create(newCohort)
    .then((cohortFromDb) => {
      res.status(201).json(cohortFromDb);
    })
    .catch((error) => {
      console.log("Error creating a new cohort in the DB...");
      console.log(error);
      res.status(500).json({ error: "Failed to create a new cohort" });
    });
});

router.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohortsFromDb) => {
      res.status(200).json(cohortsFromDb);
    })
    .catch((error) => {
      console.log("Error getting all cohorts from the DB...");
      console.log(error);
      res.status(500).json({ error: "Failed to get all cohorts" });
    });
});

router.get("/api/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findById(cohortId)
    .then((cohortFromDb) => {
      res.status(200).json(cohortFromDb);
    })
    .catch((error) => {
      console.log("Error getting a cohort from the DB...");
      console.log(error);
      res.status(500).json({ error: "Failed to get a cohort" });
    });
});

router.put("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  const newCohortDetails = req.body;

  Cohort.findByIdAndUpdate(cohortId, newCohortDetails, { new: true })
    .then((cohortFromDb) => {
      res.status(200).json(cohortFromDb);
    })
    .catch((error) => {
      console.log("Error updating a cohort in the DB...");
      console.log(error);
      res.status(500).json({ error: "Failed to update a cohort" });
    });
});

router.delete("/api/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then((response) => {
      res.status(204).json(response);
    })
    .catch((error) => {
      console.log("Error deleting a cohort from the database");
      console.log(error);
      res.status(500).json({ error: "Failed to delete a cohort" });
    });
});

module.exports = router;
