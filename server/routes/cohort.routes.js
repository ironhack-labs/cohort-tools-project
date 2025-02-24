const router = require("express").Router();

const mongoose = require("mongoose");

const Cohort = require("../models/Cohort.model");
const Student = require("../models/Student.model");

router.get("/", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      // console.log("Retrieved cohorts ::", cohorts);
      res.json(cohorts);
    })
    .catch((err) => {
      console.error("error whilel retrieving cohorts::", err);
    });
});

router.get("/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findById(cohortId)
    .then((cohort) => {
      // console.log("Retrieved cohort ::", cohort);
      res.json(cohort);
    })
    .catch((err) => {
      console.error("Error while retrieving cohort ::", err);
      res.status(500).json({ error: "Error while retrieving cohort" });
    });
});

router.post("/", (req, res) => {
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
    .then((createCohort) => {
      // console.log("cohort created ::", createCohort);
      res.status(201).json(createCohort);
    })
    .catch((err) => {
      console.error("Error while creating a Cohort::::", err);
      res.status(500).json({ err: "failed to create Cohort" });
    });
});

router.put("/:cohortId", (req, res) => {
  const { cohortId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Cohort updated::", updatedCohort);
      res.json(updatedCohort);
    })
    .catch((err) => {
      console.error("Error while updating a Cohort::::", err);
      res.status(500).json({ err: "failed to update Cohort" });
    });
});

router.delete("/:cohortId", (req, res) => {
  const { cohortId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cohort.findByIdAndDelete(cohortId)
    .then((result) => {
      console.log("cohort deleted!!!");
      res.status(204).send();
    })
    .catch((err) => {
      console.error("Error while deleting a Cohort::::", err);
      res.status(500).json({ err: "failed to delete Cohort" });
    });
});

module.exports = router;
