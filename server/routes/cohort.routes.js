const express = require("express");
const router = express.Router();

const Cohort = require("../models/Cohort.model");

// mostrar todos los cohorts
router.get("/", (req, res, next) => {
    Cohort.find({})
      .then((cohorts) => {
        console.log("Retrieved cohort ->", cohorts);
        res.status(200).json(cohorts);
      })
      .catch((error) => {
        next(error)
      });
  });
  
  // crear un cohort
  router.post("/", async (req, res, next) => {
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
  
    try {
      const response = await Cohort.create({
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
      });
      res.status(201).json({ message: "cohort creado!" });
    } catch (error) {
      next(error);
    }
  });
  
  // mostrar detalles de un cohort
  router.get("/:cohortId", async (req, res, next) => {
    try {
      const response = await Cohort.findById(req.params.cohortId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
  
  // actualiza un cohort por id
  router.put("/:cohortId", async (req, res, next) => {
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
  
    try {
      const response = await Cohort.findByIdAndUpdate(
        req.params.cohortId,
        {
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
        },
        { new: true }
      );
      res.status(202).json(response)
    } catch (error) {
      next(error)
    }
  });
  
  // borrar un cohort
  router.delete("/:cohortId", async (req, res, next) => {
    try {
  
      await Cohort.findByIdAndDelete(req.params.cohortId)
      res.status(202).json({message: "cohort borrado"})
      
    } catch (error) {
      next(error)
    }
  })

  module.exports = router