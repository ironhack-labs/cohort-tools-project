const router = require("express").Router();
const express = require("express");
const Student = require("../models/Student.model");
/**
 *
 */
router.post("/", (req, res, next) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    project: req.body.project,
    cohort: req.body.cohort,
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while creating a new student" });
      next(error);
    });
});

router.get("/", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting all students" });
      next(error);
    });
});

router.get("/cohort/:cohortId", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while getting all students in the cohort" });
      next(error);
    });
});

router.get("/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while getting a specific student" });
      next(error);
    });
});

router.put("/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while updating a specific student" });
      next(error);
    });
});

router.delete("/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while deleting a specific student" });
      next(error);
    });
});

module.exports = router;
