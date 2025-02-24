const router = require("express").Router();

const mongoose = require("mongoose");

const Student = require("../models/Student.model");

router.get("/", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      // console.log("Retrieved students ::", students);
      res.json(students);
    })
    .catch((err) => {
      console.error("error whilel retrieving students::", err);
    });
});

router.get("/:studentId", (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      // console.log("Retrieved student ::", student);
      res.json(student);
    })
    .catch((err) => {
      console.error("Error while retrieving student ::", err);
      res.status(500).json({ error: "Error while retrieving student" });
    });
});

router.get("/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((student) => {
      // console.log("Retrieved student with cohort ID ::", student);
      res.json(student);
    })
    .catch((err) => {
      console.error("Error while retrieving student cohort ID ::", err);
      res
        .status(500)
        .json({ error: "Error while retrieving student cohort ID" });
    });
});

router.post("/", (req, res) => {
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
      console.log("student createdd!!", createdStudent);
      res.status(201).json(createdStudent);
    })
    .catch((err) => {
      console.error("error while creating student", err);
      res.status(500).json({ err: "error while creating student" });
    });
});

router.put("/api/students/:studentId", (req, res) => {
  const { studentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("student updated!!! ::", updatedStudent);
      res.json(updatedStudent);
    })
    .catch((err) => {
      console.error("error while updating student", err);
      res.status(500).json({ err: "error while updating student" });
    });
});

router.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findByIdAndUpdate(studentId)
    .then((result) => {
      console.log("student deleted!!!");
      res.status(204).send();
    })
    .catch((err) => {
      console.error("error while deleting student", err);
      res.status(500).json({ err: "error while deleting student" });
    });
});

module.exports = router;
