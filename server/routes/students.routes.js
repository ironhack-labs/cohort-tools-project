const router = require("express").Router();
const mongoose = require("mongoose");
const Student = require("../models/Student.model");
//all the routes are prefixed with /api/students
/**
 * what's in a request?
 * request body:hold some informations
 * request params: a part of the url which can change
 * request query: search params or querystrings
 */

// router.get("/", (req, res) => {
//   Student.find({})
//     .then((students) => {
//       res.json(students);
//     })
//     .catch((error) => {
//       console.error("error while retreiving students", error);
//       res.status(500).send({ error: "failed to retreive students" });
//     });
// });

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    let skip = 0;
    let limit = 2;

    if (req.query.skip !== undefined) {
      skip = Number(req.query.skip);
    }
    if (req.query.limit !== undefined) {
      limit = Number(req.query.limit);
    }

    const allStudents = await Student.find({}).limit(limit).skip(skip);
    res.status(200).json(allStudents);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const createdStudent = await Student.create(req.body);
    res.status(201).json(createdStudent);
  } catch (error) {
    next(error);
  }
});

// Retrieves a specific student by ID

router.get("/:studentId", (req, res, next) => {
  // const id = Number(req.params.studentId);
  Student.findById(req.params.studentId)
    .then((oneStudent) => {
      res.json(oneStudent);
    })
    .catch((err) => {
      next(error);
    });
});

// Updates a specific student by id

router.put("/:studentId", async (req, res, next) => {
  try {
    const newStudent = req.body;
    const updatedStudent = await Student.findOneAndUpdate(
      req.params.studentId,
      newStudent,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

// Deletes a specific student by Id

router.delete("/:studentId", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findOneAndDelete(req.params.studentId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// retrieves all of the students for a given cohort

router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const cohortStudents = await Student.find({ cohort: req.params.cohortId });
    res.status(200).json(cohortStudents);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
