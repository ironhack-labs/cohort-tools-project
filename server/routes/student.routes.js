const router = require("express").Router()

const Student = require("../models/Student.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/api/students", isAuthenticated, (req, res) => {

    const newStudent = req.body

    Student.create(newStudent)
        .then((student) => {
            res.status(201).json(student)
        })
        .catch((err) => {
            console.log("error creating a new student...")
            next(err)
        })
})

router.get("/api/students", (req, res) => {
    Student
        .find({})
        .populate("cohort")
        .then((students) => {
            console.log("Retrieved students", students)
            res.json(students)
        })
        .catch((err) => {
            console.error("Error while retrieving students ->")
            next(err)
        })
})

router.get("/api/students/cohort/:cohortId", (req, res) => {
    const { cohortId } = req.params

    Student.find({ cohort: cohortId })
        .populate("cohort")
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            console.log("error getting a student...")
            next(err)
        })
})

router.get("/api/students/:studentID", (req, res) => {
    const { studentID } = req.params

    Student.findById(studentID)
        .populate("cohort")
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            console.log("error getting a new student...")
            next(err)
        })
})

router.put("/api/students/:studentId", isAuthenticated, (req, res) => {
  const { studentId } = req.params
  const newDetails = req.body

    Student.findByIdAndUpdate(studentId, newDetails, { new: true })
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            console.log("error updating a new student...")
            next(err)
        })
})

router.delete("/api/students/:studentId", isAuthenticated, (req, res) => {
  const { studentId } = req.params

    Student.findByIdAndDelete(studentId)
        .then((student) => {
            res.status(204).json(student)
        })
        .catch((err) => {
            console.log("error deleting a new student...")
            next(err)
        })
})

module.exports = router