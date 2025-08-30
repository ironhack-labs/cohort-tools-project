const router = require("express").Router();
const Student = require("../models/students.js");

//CREATE a student
router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

//READ all students
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

//READ students by cohort
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const students = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    );
    res.json(students);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

//READ a single student by id
router.get("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("cohort");

    if (!student) {
      const error = new Error("Student not found");
      error.status = 404;
      throw error;
    }

    res.json(student);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
});

//UPDATE a student
router.put("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findByIdAndUpdate(studentId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      const error = new Error("Student not found");
      error.status = 404;
      throw error;
    }

    res.json(student);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
});

//DELETE a student
router.delete("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const deleted = await Student.findByIdAndDelete(studentId);

    if (!deleted) {
      const error = new Error("Student not found");
      error.status = 404;
      throw error;
    }

    res.status(204).send();
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
});

module.exports = router;
