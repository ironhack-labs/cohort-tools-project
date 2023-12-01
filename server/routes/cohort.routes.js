const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Cohort = require("../models/Cohort.model");
const mongoose = require("mongoose");

//GET /cohorts
router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
  //res.json(cohorts);
});

// GET /cohorts/:cohortId
router.get("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Retrieved cohorts ->", cohort);
      res.json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohort ->", error);
      res.status(500).send({ error: "Failed to retrieve cohort" });
    });
  //res.json(cohorts);
});

// POST /cohorts
router.post("/cohorts", (req, res, next) => {
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

  const newCohort = {
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
  };

  Cohort.create(newCohort)
    .then(() => {
      res.json(newCohort);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

//PUT /cohorts/:cohortId
router.put("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

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

  const updatedCohort = {
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
  };

  Cohort.findByIdAndUpdate(cohortId, updatedCohort, { new: true })
    .then(() => {
      res.json(updatedCohort);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

//DELETE /cohorts/:cohortId
router.delete("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findByIdAndDelete(cohortId)
    .then(() => {
      res.send(204);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

module.exports = router;
