const express = require("express");
const router = express.Router();

const Student = require("../models/student.model.js");

router.get("/", async (req, res) => {
  try {
    const response = await Student.find().populate("cohort");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res) => {
  console.log(req.body);

  const newStudent = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
    cohort: req.body.cohort,
  };
  Student.create(newStudent)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:studentId", async (req, res) => {
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort",
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:studentId", async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);

  try {
    const updatedStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
    };
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      updatedStudent,
    );

    res.sendStatus(202).send("student updated");
  } catch (error) {
    next(error);
  }
});

router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const studentsBelongCohort = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.status(200).json(studentsBelongCohort);
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.studentId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
