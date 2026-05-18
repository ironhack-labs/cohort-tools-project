const express = require("express")
const router = express.Router()

const Cohort = require("../models/cohort.model.js")


router.get("/", async (req, res) => {
  try {
    const response = await Cohort.find();
    res.status(200).json(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  console.log(req.body);

  const newCohort = {
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  };
  Cohort.create(newCohort)
    .then(() => {
      res.send("Cohort Created");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:cohortId", async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);

  try {
    const updatedCohort = {
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    };
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      updatedCohort,
    );

    res.status(202).send("cohort updated");
  } catch (error) {
    next(error);
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router