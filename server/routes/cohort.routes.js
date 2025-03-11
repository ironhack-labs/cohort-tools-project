const router = require("express").Router();
const Cohort = require("../models/Cohort");
const Student = require("../models/Student");

// Get all cohorts
router.get("/", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    next(error);
  }
});

// Get single cohort
router.get("/:id", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.id);
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.json(cohort);
  } catch (error) {
    next(error);
  }
});

// Create new cohort
router.post("/", async (req, res, next) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    next(error);
  }
});

// Update cohort
router.put("/:id", async (req, res, next) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.json(cohort);
  } catch (error) {
    next(error);
  }
});

// Delete cohort
router.delete("/:id", async (req, res, next) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.id);
    // When deleting a cohort, remove the cohort reference from all associated students
    await Student.updateMany({ cohort: req.params.id }, { $unset: { cohort: 1 } });
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get all students in a cohort
router.get("/:id/students", async (req, res, next) => {
  try {
    const Student = require("../models/Student");
    const students = await Student.find({ cohort: req.params.id });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
