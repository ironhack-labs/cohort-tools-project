const Cohort = require("../models/Cohort.model");
const router = require("express").Router();
const { createCohortSlug } = require("../utils/Utils");

//Get all Cohorts
router.get("/", async (req, res) => {
  const cohorts = await Cohort.find();
  res.json({ message: "All Good", data: cohorts });
});

//  POST  /cohort route
router.post("/", async (req, res) => {
  const cohortSlug = createCohortSlug(req.body.cohortName, req.body.startDate);

  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
    createdDate: req.body.createdDate,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while creating a new Cohort" });
    });
});

//  GET  /cohorts/:id route
router.get("/:cohortId", async (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while getting a single cohort" });
    });
});

//  PUT  /cohorts/:id route
router.put("/:cohortId", async (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while updating a single cohort" });
    });
});

//  DELETE  /cohorts/:id route
router.delete("/:cohortId", async (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while deleting a single cohort" });
    });
});

module.exports = router;
