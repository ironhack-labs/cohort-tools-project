const express = require("express");
const Student = require("../models/students.model");
const router = express.Router();

// POST - STUDENT
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
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while creating a new Student",
      });
    });
});

router.get("/api/students", async (req, res) => {
  try {
    const foundStudents = await Student.find().populate("cohort");
    res.json(foundStudents);
  } catch (error) {
    console.log("error receiving students", error);
    res.status(500).json({ message: "Error retrieving students" });
  }
});

router.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching students in cohort" });
  }
});

router.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while fetching student by ID" });
    });
});

router.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while updating student" });
    });
});

router.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while deleting student" });
    });
});
module.exports = router;
