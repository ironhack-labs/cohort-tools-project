const router = require("express").Router();
const Student = require("../models/Student");

// Get all students
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// Get single student
router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate("cohort");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Create new student
router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    await student.populate("cohort");
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

// Update student
router.put("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("cohort");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Delete student
router.delete("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get student's cohort
router.get("/:id/cohort", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate("cohort");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student.cohort);
  } catch (error) {
    next(error);
  }
});

// Get all students for a specific cohort
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
