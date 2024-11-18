const router = require("express").Router();
const Cohort = require("../models/Cohort.model");
const { isAuthenticated } = require("../middleware/jwt");

// COHORT ROUTES
// POST /api/cohorts - Creates a new cohort
router.post("/api/cohorts", (req, res, next) => {
    const newCohort = req.body;
  
    Cohort.create(newCohort)
      .then((cohortFromDB) => {
        res.status(201).json(cohortFromDB);
      })
      .catch((error) => {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Failed to create a new cohort" });
      });
  });
  
  // GET /api/cohorts - Retrieves all of the cohorts in the database collection
  router.get("/api/cohorts", (req, res, next) => {
    Cohort.find()
      .then((cohortsFromDB) => {
        res.status(200).json(cohortsFromDB);
      })
      .catch((error) => {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Failed to get list of cohorts" });
      });
  });
  
  // GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
  router.get("/api/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
  
    Cohort.findById(cohortId)
      .then((cohortsFromDB) => {
        res.status(200).json(cohortsFromDB);
      })
      .catch((error) => {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Failed to get this cohort details" });
      });
  });
  
  // PUT /api/cohorts/:cohortId - Updates a specific cohort by id
  router.put("/api/cohorts/:cohortId", isAuthenticated, (req, res, next) => {
    const { cohortId } = req.params;
    const newDetails = req.body;
  
    Cohort.findByIdAndUpdate(cohortId, newDetails, { new: true })
      .then((cohortsFromDB) => {
        res.status(200).json(cohortsFromDB);
      })
      .catch((error) => {
        next(error);
        console.error(error);
        res.status(500).json({ error: "Failed to update the cohort" });
      });
  });
  
  // DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
  router.delete("/api/cohorts/:cohortId", isAuthenticated, (req, res, next) => {
    const { cohortId } = req.params;
  
    Cohort.findByIdAndDelete(cohortId)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        next(error);
        console.error("Error deleting cohort...");
        console.error(error);
        res.status(500).json({ error: "Failed to delete cohort" });
      });
  });
  module.exports = router;