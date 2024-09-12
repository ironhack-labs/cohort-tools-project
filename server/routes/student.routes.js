const express = require("express");
const router = express.Router();

const Student = require("../models/Student.model");
const Cohort = require("../models/Cohorts.model");

router.post("/students", async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    } = req.body;
    try {
      const newStudent = await Student.create({
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl,
        languages,
        program,
        background,
        image,
        cohort,
        projects,
      });
      res.status(201).json(newStudent);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  

  
  router.get("/students/cohort/:cohortId", async (req, res, next) => {
    try {
      const { cohortId } = req.params;
      /* const student = await Student.cohort.findById(cohortId).populate("cohort"); */
      const student = await Student.find({ cohort: cohortId }).populate("cohort");
      res.status(200).json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error" });
      next(error);
    }
  });
  
  router.get("/students", (req, res, next) => {
    Student.find({})
      .populate("cohort")
      .then((students) => {
        console.log("Retrieved Students ->", students);
        res.json(students);
      })
      .catch((error) => {
        console.error("Error while retrieving students", error);
        res.status(500).json({ error: "Failed to retrieve students" });
        next(error);
      }); 
      
  });
  
  router.get("/students/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id).populate("cohort");
      res.status(200).json(student);
    } catch (error) {
      /* res.status(500).json({ message: "Error retrieving student" }); */
      next(error);
    }
  });
  
  router.put("/students/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          phone,
          linkedinUrl,
          languages,
          program,
          background,
          image,
          cohort,
          projects,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: "Error updating student" });
      next(error);
    }
  });
  
  router.delete("/students/:studentId", async (req, res, next) => {
    try {
      const { studentId } = req.params;
      const student = await Student.findByIdAndDelete(studentId);
      res.status(200).json(student);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;