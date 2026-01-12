
const Student = require("../models/studentModels")

const router = require("express").Router()


router.get("/api/students", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort")
    res.json(students)
  } catch (err) {
    console.log("Error getting students", err)
    res.status(500).json({ error: "Error getting students" })
  }
});

router.post(`/api/students`, async (req, res, next) => {
  try {
    const newStudent = req.body
    const studentFromDB = await Student.create(newStudent)
    res.status(201).json(studentFromDB)
  } catch (err) {
    console.log("Error create new Student", err)
    res.status(500).json({ error: "Error create new Student" })
  }
})

router.get(`/api/students/cohort/:cohortId`, async (req, res, next) => {
  const { cohortId } = req.params
  try {
  
    const students = await Student.find({ cohort: cohortId }).populate("cohort")
    res.json(students)
  } catch (err) {
    console.log("Error getting students for cohort", err)
    res.status(500).json({ error: "Error getting students for cohort" })
  }
})

router.get(`/api/students/:studentId`, async (req, res, next) => {
  const { studentId } = req.params
  try {
    const studentFromDB = await Student.findById(studentId).populate("cohort")
    res.json(studentFromDB)
  } catch (err) {
    console.log("Error getting student ID from DB", err)
    res.status(500).json({ error: "Error getting student ID from DB" })
  }
})

router.put(`/api/students/:studentId`, async (req, res, next) => {
  const { studentId } = req.params
  const newStudent = req.body
  try {
    const studentFromDB = await Student.findByIdAndUpdate(studentId, newStudent, { new: true })
    res.json(studentFromDB)
  } catch (err) {
    console.log("Error updating student ID from DB", err)
    res.status(500).json({ error: "Error updating student ID from DB" })
  }
})

router.delete(`/api/students/:studentId`, async (req, res, next) => {
  const { studentId } = req.params
  try {
    const response = await Student.findByIdAndDelete(studentId)
    res.json(response)
  } catch (err) {
    console.log("Error deleting student ID from DB", err)
    res.status(500).json({ error: "Error deleting student ID from DB" })
  }
})

module.exports = router