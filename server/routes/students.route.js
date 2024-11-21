const express = require("express");
const Student = require("../models/Students.model");

const studentRouter = express.Router();

// Retrieves all of the students for a given cohort
studentRouter.get("/students/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  console.log(cohortId);

  try {
    await Student.find({ cohort: cohortId })
      .populate("cohort")
      .then((students) => {
        res.status(200).json(students);
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Retrives all the students
studentRouter.get("/students", async (req, res) => {
  try {
    await Student.find().then((students) => {
      res.status(200).json(students);
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Retrieves a specific student by id
studentRouter.get("/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    await Student.findById({ _id: studentId })
      .populate("cohort")
      .then((student) => {
        res.status(200).json(student);
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
});

// Updates a specific student by id
studentRouter.put("/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    await Student.findByIdAndUpdate({ _id: studentId }, req.body).then(
      (student) => {
        res.status(200).json(student);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student", error });
  }
});

// Deletes a specific student by id
studentRouter.delete("/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    await Student.findByIdAndDelete({ _id: studentId }).then(() => {
      res.status(204).json();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting student", error });
  }
});

module.exports = studentRouter;
