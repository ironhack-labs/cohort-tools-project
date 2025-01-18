const Student = require("../models/Student.model.js");

const router = require("express").Router();

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
    .then((student) => {
      console.log("Student created:", student);
      res.status(201).json(student);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to create the student." });
    });
});

router.get("/api/students", (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((student) => {
      console.log("Found students:", student);
      res.status(200).json(student);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/api/students/cohort/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((student) => {
      console.log("Found students:", student);
      res.status(200).json(student);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to load students." });
      next(err);
    });
});

router.get("/api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Found student:", student);
      res.status(200).json(student);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to load the student." });
      next(err);
    });
});

router.put("/api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((student) => {
      console.log("Updated student:", student);
      res.status(200).json(student);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to update the student." });
      next(err);
    });
});

router.delete("/api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId)
    .then((student) => {
      console.log("Student deleted.");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete the student." });
      next(err);
    });
});

module.exports = router;
