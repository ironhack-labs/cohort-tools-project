const router = require("express").Router();
const Student = require("../models/Student.model");

router.get("/", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      next(error);
    });
});

router.get("/cohort/:cohortId", (req, res, next) => {
  // Returns all the students of a specified cohort in JSON format
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students for this cohort ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      next(error);
    });
});

router.get("/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      next(error);
    });
});

router.post("/", (req, res, next) => {
  Student.create(req.body)
    .then((createdStudent) => {
      console.log("Created student ->", createdStudent);
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.error(
        `Failed to create student with name ${req.body.firstName}: `,
        error
      );
      next(error);
    });
});

router.put("/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Updated student ->", updatedStudent);
      res.status(201).json(updatedStudent);
    })
    .catch((error) => {
      console.error("Error while updating student ->", error);
      next(error);
    });
});

router.delete("/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((deletedStudent) => {
      console.log("Deleted student ->", deletedStudent);
      res
        .status(200)
        .json(`Student with id ${req.params.studentId} was deleted`);
    })
    .catch((error) => {
      console.error("Error while deleting student ->", error);
      next(error);
    });
});

module.exports = router;
