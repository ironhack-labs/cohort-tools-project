const express = require('express')
const router = express.Router()

const Student = require('../models/Student.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');


//STUDENTS
router.get("/",  (req, res) => {
   Student.find({})
  .then(students => {
    console.log("Retrieved students:", students)
     res.status(200).json(students);
  })
  .catch(error => {
    console.error("Error while retrieving students data", error)
    res.status(500).json({ error: "Failed to retrieve students data"})
  })
});

router.post("/",  (req, res) => {
   Student.create(req.body)
  .then(createdStudent => {
    console.log("Created student:", createdStudent)
     res.status(200).json(createdStudent);
  })
  .catch(error => {
    console.error("Error while creating student", error)
    res.status(500).json({ error: "Failed to create student"})
  })
});

//Get all students of a given cohort
router.get("/cohort/:cohortId",  (req, res) => {
   Student.find({ cohort: req.params.cohortId })
   .populate("cohort")
  .then(students => {
    console.log("Retrieved students:", students)
     res.status(200).json(students);
  })
  .catch(error => {
    console.error("Error while retrieving students of cohort.", error)
    res.status(500).json({ error: "Failed to retrieve students of cohort."})
  })
});

//Get specific student by Id
router.get("/:studentId",  (req, res) => {
   Student.findById(req.params.studentId)
  .then(student => {
    console.log("Retrieved student:", student)
     res.status(200).json(student);
  })
  .catch(error => {
    console.error("Error while retrieving students data", error)
    res.status(500).json({ error: "Failed to retrieve students data"})
  })
});

router.put("/:studentId",  (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
  .then(updatedStudent => {
    console.log("Updated student", updatedStudent)
    res.status(200).json(updatedStudent)
  })
  .catch(error => {
    console.error("Error updating student", error)
    res.status(500).json( { error: "Error updating student."})
  })
})

router.delete("/:studentId",  (req, res) => {
 Student.findByIdAndDelete(req.params.studentId)
  .then(result => {
    console.log("Student deleted")
    res.status(204).send();
  })
  .catch(error => {
    console.error("Error deleting student", error)
    res.status(500).json( {error: "Error deleting student"})
  })
})

module.exports = router;