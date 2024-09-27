const Cohort = require("../models/Cohort.model");

const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/api/cohorts", isAuthenticated, (req, res) => {
  Cohort.create({
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
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating new Cohort" });
    });
});

router.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((allCohorts) => {
      res.status(200).json(allCohorts);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error getting all Cohorts" });
    });
});

router.get("/api/cohorts/:cohortId", isAuthenticated, (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error getting single Cohort" });
    });
});

router.put("/api/cohorts/:cohortId", isAuthenticated, (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating Cohort" });
    });
});

router.delete("/api/cohorts/:cohortId", isAuthenticated, (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting Cohort" });
    });
});

module.exports = router;
