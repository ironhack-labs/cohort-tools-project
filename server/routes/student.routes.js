const router = require("express").Router();
const Student = require("../models/Student.model");

// GET /api/students - Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// GET /api/students/cohort/:cohortId - Get all students from a specific cohort
router.get("/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const students = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    );
    res.json(students);
  } catch (error) {
    console.error("Error fetching students by cohort:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// GET /api/students/:studentId - Get a student by ID
router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate("cohort");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student" });
  }
});

// POST /api/students - Create a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student" });
  }
});

// PUT /api/students/:studentId - Update a student by ID
router.put("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("cohort");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student" });
  }
});

// DELETE /api/students/:studentId - Delete a student by ID
router.delete("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
});

module.exports = router;
