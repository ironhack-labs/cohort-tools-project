const Student = require("../models/Student.model");
const router = require("express").Router();

// Get all Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json({ message: "All Good", data: students });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: err.message });
  }
});

// POST /students route
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({
      message: "Error while creating a new student",
      error: err.message,
    });
  }
});

// GET /students/:id route
router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.status(200).json(student);
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while getting a single student",
      error: err.message,
    });
  }
});

// PUT /students/:id route
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
    if (!updatedStudent) {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.status(200).json(updatedStudent);
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while updating a single student",
      error: err.message,
    });
  }
});

// DELETE /students/:id route
router.delete("/:studentId", async (req, res) => {
  try {
    const deleteResult = await Student.findByIdAndDelete(req.params.studentId);
    if (!deleteResult) {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while deleting a single student",
      error: err.message,
    });
  }
});

module.exports = router;
