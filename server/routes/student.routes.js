const router = require('express').Router();
const Student = require("../models/Student.model");
const { isAuthenticated } = require("../middleware/jwt");


// STUDENTS ROUTES
// POST /api/students - Creates a new student
router.post("/api/students", (req, res, next) => {
    const newStudent = req.body;
  
    Student.create(newStudent)
      .then((studentFromDB) => {
        res.status(201).json(studentFromDB);
      })
      .catch((error) => {
        next(error);
        res.status(500).json({ error: "Failed to create a new student" });
      });
  });
  
  // GET /api/students - Retrieves all of the students in the database collection
  router.get("/api/students", (req, res, next) => {
    Student.find()
      .populate("cohort")
      .then((studentsFromDB) => {
        res.status(200).json(studentsFromDB);
      })
      .catch((error) => {
        next(error);
        res.status(500).json({ error: "Failed to get list of students" });
      });
  });
  
  // GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
  router.get("/api/students/cohort/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
  
    Student.find({ cohort: cohortId })
      .populate("cohort")
      .then((studentsFromDB) => {
        res.status(200).json(studentsFromDB);
      })
      .catch((error) => {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Failed to get this students list" });
      });
  });
  
  // GET /api/students/:studentId - Retrieves a specific student by id
  router.get("/api/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;
  
    Student.findById(studentId)
      .populate("cohort")
      .then((studentsFromDB) => {
        res.status(200).json(studentsFromDB);
      })
      .catch((error) => {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Failed to get this student details" });
      });
  });
  
  // PUT /api/students/:studentId - Updates a specific student by id
  router.put("/api/students/:studentId", isAuthenticated, (req, res, next) => {
    const { studentId } = req.params;
    const newDetails = req.body;
  
    Student.findByIdAndUpdate(studentId, newDetails, { new: true })
      .then((studentsFromDB) => {
        res.status(200).json(studentsFromDB);
      })
      .catch((error) => {
        next(error);
        console.error(error);
        res.status(500).json({ error: "Failed to update the student" });
      });
  });
  
  // DELETE /api/students/:studentId - Deletes a specific student by id
  router.delete("/api/students/:studentId", isAuthenticated, (req, res, next) => {
    const { studentId } = req.params;
  
    Student.findByIdAndDelete(studentId)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        next(error);
        console.error("Error deleting student...");
        console.error(error);
        res.status(500).json({ error: "Failed to delete student" });
      });
  });
  module.exports = router;
  