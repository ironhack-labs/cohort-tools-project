const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");
// const studentData = require("../students.json");

// Students Routes

router.get("/api/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.log("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

router.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
    Student.find({ cohort:cohortId })
    .populate("cohort")
    .then((cohortStudents) => {
      res.json(cohortStudents);
    })
    .catch((err) => {
      console.error("Failed to get cohort students", err);
      res.status(500).json({ err: err });
    });
});

router.get("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .populate("cohort")
    .then((oneStudent) => {
      res.json(oneStudent);
    })
    .catch((err) => {
      console.error("Failed to get one student", err);
      res.status(500).json({ err: err });
    });
});

router.post("/api/students", (req, res) => {
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
    cohort: req.body.cohort,
    projects: req.body.projects,
  })
    .then((createdStudent) => {
      console.log("Student created ->", createdStudent);
      res.json(createdStudent);
    })
    .catch((err) => {
      console.error("Failed to create a student", err);
      res.status(500).send({ err: err });
    });
});

router.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body,  {new: true})
    .then((updatedStudent) => {
      console.log("Updated student ->", updatedStudent);
      res.status(204).json(updatedStudent);
    })
    .catch((err) => {
      res.status(500).send({ err: err });
    });
});

router.delete("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findByIdAndDelete(studentId)
    .then((result) => {
      console.log("result", result);
      res.status(204).send();
    })
    .catch((err) => {
      console.error("Failed to delete one student", err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;

