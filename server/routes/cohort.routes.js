const Cohort = require("../models/Cohort.model");
const express = require("express");

const cohortRouter = express.Router();

cohortRouter.get("/api/cohorts", (req, res, next) => {
  const { campus, program } = req.query;
  console.log(program);
  if (campus && !program) {
    Cohort.find({ campus: campus })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.json(error));
    return;
  }

  if (program && !campus) {
    Cohort.find({ program: program })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.json(error));
    return;
  }
  if (campus && program) {
    Cohort.find({ program: program, campus: campus })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
    return;
  }
  Cohort.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
      next(error);
    });
});
// cohortRouter.get("/api/cohorts", (req, res) => {
//   throw new Error("Test error");
// });
cohortRouter.get("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
cohortRouter.put("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(
    cohortId,
    {
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      endDate: req.body.endDate,
      program: req.body.program,
      programManager: req.body.programManager || "",
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
cohortRouter.post("/api/cohorts", (req, res) => {
  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    endDate: req.body.endDate,
    program: req.body.program,
    programManager: req.body.programManager || "",
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

cohortRouter.delete("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndDelete(cohortId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

cohortRouter.get("/api/cohorts", (req, res) => {
  const { queryString } = req.query;
  console.log(queryString);
});

module.exports = cohortRouter;
