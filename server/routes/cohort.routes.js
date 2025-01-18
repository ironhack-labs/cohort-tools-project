const Cohort = require("../models/Cohort.model");

const router = require("express").Router();

router.post("/api/cohorts", (req, res, next) => {
  Cohort.create(req.body)
    .then((createdCohort) => {
      console.log("Cohort created: ", createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create the cohort" });
      next(err);
    });
});

router.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohort) => {
      console.log("Found cohorts:", cohort);
      res.status(200).json(cohort);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/api/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Found cohort:", cohort);
      res.status(200).json(cohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to load the cohort." });
      next(err);
    });
});

router.put("/api/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((cohort) => {
      console.log("Updated cohort:", cohort);
      res.status(200).json(cohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to update the cohort." });
      next(err);
    });
});

router.delete("/api/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndDelete(cohortId)
    .then((cohort) => {
      console.log("Cohort deleted.");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete the cohort." });
      next(err);
    });
});

module.exports = router;
