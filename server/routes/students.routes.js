const { default: mongoose } = require("mongoose");
const Student = require("../models/Student.model");

const router = require("express").Router();
// All routes starts with /api/recipes

router.get("/", async (req, res) => {
  try {
    const studentsData = await Student.find().populate("cohort");
    res.json(studentsData);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.studentId)) {
      res.status(500).json("Invalid Id");
    } else {
      const studentData = await Student.findById(req.params.studentId).populate(
        "cohort"
      );
      res.json(studentData);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.studentId)) {
      res.status(500).json("Invalid Id");
    } else {
      await Student.findByIdAndDelete(req.params.studentId);

      res.status(204);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
