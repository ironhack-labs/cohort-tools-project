const router = require("express").Router();
const mongoose = require("mongoose");

const Student = require("../models/Student.model");
const {isAuthenticated} = require("../middleware/jwt.middleware")

// Student Routes
router.post("/api/students", isAuthenticated, (req, res, next) => {
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
      projects,
    } = req.body;
  
    Student.create({
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
    })
      .then((createdStudent) => {
        res.status(201).json(createdStudent);
      })
      .catch((error) => {
        next(error);
        // res
        //   .status(500)
        //   .json({ message: "There was an error creating a student" });
      });
  });
  
  router.get("/api/students", (req, res, next) => {
    Student.find()
      .populate("cohort")
      .then((listAllStudents) => {
        res.status(200).json(listAllStudents);
      })
      .catch((error) => {
        next(error);
        //res
        // .status(500)
        // .json({ message: "There was an error getting all students" });
      });
  });
  
  router.get("/api/students/cohort/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    Student.find({ cohort: cohortId })
      .populate("cohort")
      .then((studentFromCohort) => {
        res.status(200).json(studentFromCohort);
      })
      .catch((error) => {
        next(error);
        //res.status(500).json({
        //  message: "There was an error getting the student from a given cohort",
      });
  });
  
  router.get("/api/students/:studentId", (req, res, next) => {
    Student.findById(req.params.studentId)
      .populate("cohort")
      .then((studentById) => {
        res.status(200).json(studentById);
      })
      .catch((error) => {
        next(error);
        // res
        //.status(500)
        // .json({ message: "There was an error getting a student by id." });
      });
  });
  
  router.put("/api/students/:studentId", isAuthenticated, (req, res, next) => {
    Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
      .then((updateStudent) => {
        res.status(200).json(updateStudent);
      })
      .catch((error) => {
        next(error);
  
        // res
        //   .status(500)
        //   .json({ message: "There was an error updating a student." });
      });
  });
  
  router.delete("/api/students/:studentId", isAuthenticated, (req, res, next) => {
    Student.findByIdAndDelete(req.params.studentId)
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => {
        next(error);
        //  res
        // .status(500)
        //.json({ message: "There was an error deleting a student." });
      });
  });


  module.exports = router