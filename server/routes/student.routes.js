const router = require("express").Router();
const mongoose = require("mongoose");

const Student = require("../models/Student.model");
const Cohort = require("../models/Cohort.model");

const errorMsg = (verb) => `Error while ${verb} the student(s)`;

// Retrieves all
router.get("/students", (req, res) =>
  Student.find()
    .then((students) => res.status(200).json(students))
    .catch((err) => {
      console.error(errorMsg("getting"), err);
      res.status(500).json({ message: errorMsg("getting") });
    })
);

// Creates a new one
router.post("/students", (req, res) =>
  Student.create(req.body)
    .then((student) => res.status(201).json(student))
    .catch((err) => {
      console.error(errorMsg("creating"), err);
      res.status(500).json({ message: errorMsg("creating") });
    })
);

// Retrieves a specific one by id
router.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Invalid student id" });
    return;
  }

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => res.status(200).json(student))
    .catch((err) => {
      console.error(errorMsg("getting"), err);
      res.status(500).json({ message: errorMsg("getting") });
    });
});

// Updates a specific one by id
router.put("/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Invalid student id" });
    return;
  }

  console.log(req.body);

  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((student) => res.status(200).json(student))
    .catch((err) => {
      console.error(errorMsg("updating"), err);
      res.status(500).json({ message: errorMsg("updating") });
    });
});

// Deletes a specific one by id
router.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Invalid student id" });
    return;
  }

  Student.findByIdAndDelete(req.params.studentId)
    .then(() =>
      res.status(200).json({
        message: `Student with ${studentId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.error(errorMsg("deleting"), err);
      res.status(500).json({ message: errorMsg("deleting") });
    });
});

// Retrieves all of the students for a given cohort
router.get("/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Invalid cohort id" });
    return;
  }

  Student.find({ cohort: cohortId })
    .then((students) => res.status(200).json(students))
    .catch((err) => {
      console.error(errorMsg("getting"), err);
      res.status(500).json({ message: errorMsg("getting") });
    });
});

module.exports = router;
