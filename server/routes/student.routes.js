const Student = require("../models/Student.model.js");
const studentRouter = require("express").Router();

studentRouter.get("/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving all students" });
    });
});

studentRouter.post("/students", (req, res) => {
  Student.create(req.body)
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating a student" });
    });
});

studentRouter.get("/students/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((foundStudents) => {
      res.status(200).json(foundStudents);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding students from a cohort" });
    });
});

studentRouter.get("/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding a student" });
    });
});

studentRouter.put("/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body)
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating a student" });
    });
});

studentRouter.delete("/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting a student" });
    });
});

module.exports = studentRouter;
