const router = require("express").Router();
const Student = require("../models/Student");
const CustomError = require("../error-handling/CustomError");

// Student Routes

router.get("/", async (req, res, next) => {
  // Return list of students
  // res.status(200).json(studentsData);
  // res.sendFile(path.join(__dirname, "data", "students.json"));
  try {
    const students = await Student.find().populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    next(new CustomError("Error retrieving students", 500));
  }
});

router.post("/", async (req, res, next) => {
  // Create a new student
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(new CustomError("Error creating student", 500));
  }
});

router.get("/:id", async (req, res, next) => {
  // Return a specific student by ID
  try {
    const student = await Student.findById(req.params.id).populate("cohort");
    if (!student) {
      return next(new CustomError("Student not found", 404));
    }
    res.status(200).json(student);
  } catch (error) {
    next(new CustomError("Error retrieving student", 500));
  }
});

router.put("/:id", async (req, res, next) => {
  // Update a specific student by ID
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("cohort");
    if (!updatedStudent) {
      return next(new CustomError("Student not found", 404));
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(new CustomError("Error updating student", 500));
  }
});

router.delete("/:id", async (req, res, next) => {
  // Delete a specific student by ID
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return next(new CustomError("Student not found", 404));
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    next(new CustomError("Error deleting student", 500));
  }
});

// GET /api/students/cohort/:cohortId

router.get("/cohort/:cohortId", async (req, res, next) => {
  // Return students by cohort ID
  try {
    const students = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    next(new CustomError("Error retrieving students by cohort", 500));
  }
});

module.exports = router;
