const Student = require("../models/Student.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/route-gaurd");

// POST /api/students - Creates a new student
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (err) {
    console.error("Failed to add student data");
    next(err);
  }
});

//GET /api/students - Retrieves all of the students in the database collection
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (err) {
    console.error("Failed to fetch students data");
    next(err);
  }
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students of a specific cohort
router.get('/cohort/:cohortId', async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const students = await Student.find({ cohort: cohortId }).populate("cohort");
    res.json(students);
  } catch (err) {
    console.error("Failed to fetch students of cohort id: ", cohortId);
    next(err);
  }
});

//GET /api/students/:studentId - Retrieves a specific student by id
router.get('/:studentId', async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId).populate("cohort");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("Failed to fetch students of id: ", studentId);
    next(err);
  }
});

//PUT /api/students/:studentId - Updates a specific student by id
router.put('/:studentId', isAuthenticated, async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("Failed to update students of id: ", studentId);
    next(err);
  }
});

//DELETE /api/students/:studentId - Deletes a specific student by id
router.delete('/:studentId', isAuthenticated, async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("Failed to delete students of id: ", studentId);
    next(err);
  }
});

module.exports = router;