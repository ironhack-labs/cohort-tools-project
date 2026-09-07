const express = require("express");
const router = express.Router();

const Student = require("../models/students.model");

router.get("/", (req, res, next) => {
  Student.find(req.query)
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
     next(error)
    });
});

// get all students for given cohort
router.get("/cohort/:cohortId", (req, res, next) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
    next(error)
    });
});

// create student
router.post("/", (req, res, next) => {
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
    cohort,
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
    cohort,
  })
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((error) => {
next(error)
    });
});

// get student detail
router.get("/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
next(error)
    });
});

// update single student detail
router.put("/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      next(error)
    });
});

// delete one student
router.delete("/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((student) => {
      res.status(204).json(student);
    })
    .catch((error) => {
next(err)    });
});


module.exports = router