const router = require("express").Router();
const mongoose = require("mongoose");

const Cohort = require("../models/Cohort.model");

router.post("/api/cohorts", (req, res, next) => {
    const {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    } = req.body;
  
    const newCohort = {
      cohortSlug: cohortSlug,
      cohortName: cohortName,
      program: program,
      format: format,
      campus: campus,
      startDate: startDate,
      endDate: endDate,
      inProgress: inProgress,
      programManager: programManager,
      leadTeacher: leadTeacher,
      totalHours: totalHours,
    };
    Cohort.create(newCohort)
      .then((createCohort) => {
        res.status(201).json(createCohort);
      })
      .catch((error) => {
        next(error);
        // res
        //   .status(500)
        //   .json({ message: "There was an error creating a new cohort" });
      });
  });
  
  router.get("/api/cohorts", (req, res, next) => {
    Cohort.find()
      .then((listOfCohorts) => {
        res.status(200).json(listOfCohorts);
      })
      .catch((error) => {
        next(error);
        // res
        //   .status(500)
        //   .json({ message: "There was an error getting the list of cohorts" });
      });
  });
  
  router.get("/api/cohorts/:cohortId", (req, res, next) => {
    Cohort.findById(req.params.cohortId)
      .then((cohortById) => {
        res.status(200).json(cohortById);
      })
      .catch((error) => {
        next(error);
      });
  });
  
  router.put("/api/cohorts/:cohortId", (req, res, next) => {
    Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
      .then((updatedCohort) => {
        res.status(200).json(updatedCohort);
      })
      .catch((error) => {
        next(error);
        // res
        // .status(500)
        // .json({ message: "There was an error updating a cohort by id" });
      });
  });
  
  router.delete("/api/cohorts/:cohortId", (req, res, next) => {
    Cohort.findByIdAndDelete(req.params.cohortId)
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => {
        next(error);
        // res
        //   .status(500)
        //   .json({ message: "There was an error deleting a cohort." });
      });
  });





module.exports = router; 