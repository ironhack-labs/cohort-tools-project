const mongoose = require("mongoose");
const router = require("express").Router();
const Student = require("../models/Student.model");

//Students
router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});
//Returns all the students
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find();
    console.log(students);
    res.json(students);
  } catch (error) {
    next(error);
  }
});
//Returns the specified student by id
router.get("/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  if (mongoose.isValidObjectId(studentId)) {
    try {
      const students = await Student.findById(studentId);
      res.json(students);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json();
  }
});
// Returns all the students of a specified cohort in JSON format
router.get("/:cohortId", async (req, res, next) => {
  const { studentCohortId } = req.params;
  if (mongoose.isValidObjectId(studentCohortId)) {
    try {
      const students = await Student.findById(studentCohortId);
      res.json(students);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json();
  }
});
// Updates the specified student by id
router.put("/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  if (mongoose.isValidObjectId(studentId)) {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        req.body,
        { new: true, runValidators: true }
      );
      res.json(updatedStudent);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json();
  }
});
// Deletes the specified cohort by id
router.delete("/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  if (mongoose.isValidObjectId(studentId)) {
    try {
      await Student.findByIdAndDelete(studentId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json();
  }
});

module.exports = router;
