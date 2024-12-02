const router = require("express").Router()

const Student = require('../models/student.model')


router.post('/students', (req, res, next) => {

    Student
        .create(req.body)
        .then(createdStudent => res.json(createdStudent))
        .catch(err => next(err))
})

//Read all studets
router.get('/students', (req, res, next) => {

    Student
        .find()
        .populate("cohort")
        .then(allStudents => res.json(allStudents))
        .catch(err => next(err))
})


//Read student by id
router.get('/students/:studentId', (req, res, next) => {

    const { studentId } = req.params

    Student
        .findById(studentId)
        .populate("cohort")
        .then(studentById => res.json(studentById))
        .catch(err => next(err))
})


//Read all students from cohort
router.get('/students/cohort/:cohortId', (req, res, next) => {

    const { cohortId } = req.params

    Student
        .find({ cohort: cohortId })
        .populate("cohort")
        .then(studentsOfCohort => res.json(studentsOfCohort))
        .catch(err => next(err))
})


//Update student
router.put('/students/:studentId', (req, res, next) => {

    const { studentId } = req.params

    Student
        .findByIdAndUpdate(
            studentId,
            req.body,
            { new: true }
        )
        .then(newStudentDetails => res.json(newStudentDetails))
        .catch(err => next(err))
})


//Delete student
router.delete('/students/:studentId', (req, res) => {

    const { studentId } = req.params

    Student
        .findByIdAndDelete(studentId)
        .then(studentDeleted => res.json(studentDeleted))
        .catch(err => next(err))
})

module.exports = router