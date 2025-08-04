const router = require("express").Router()

const Student = require("../models/Student.model")


// GET /students - retrieve all the students
router.get("/students", (req, res) => {
    Student.find({})
        .populate("cohort")
        .then((students) => {
            console.log("Retrieved students ->", students);
            res.json(students);
        })
        .catch((error) => {
            next(error);
        });
});

//  POST  /students route

router.post("/students", (req, res, next) => {
    const newStudent = req.body;

    Student.create(newStudent)
        .then((studentFromDB) => {
            res.status(201).json(studentFromDB)
        })
        .catch((error) => {
            next(error);
        })
})

//  GET  /students/:id route
router.get("/students/:studentId", (req, res, next) => {
    const { studentId } = req.params

    Student.findById(studentId)
        .populate("cohort")
        .then((studentFromDB) => {
            res.json(studentFromDB)
        })
        .catch((error) => {
            next(error);
        })
})

//  PUT (update) /students/:id route
router.put("/students/:studentId", (req, res, next) => {
    const { studentId } = req.params
    const newDetails = req.body

    Student.findByIdAndUpdate(studentId, newDetails, { new: true })
        .then((studentFromDB) => {
            res.json(studentFromDB)
        })
        .catch((error) => {
            next(error);
        })
})

//  DELETE  /students/:id route

router.delete("/students/:studentId", (req, res, next) => {

    const { studentId } = req.params

    Student.findByIdAndDelete(studentId)
        .then((response) => {
            res.sendStatus(204)
        })
        .catch((error) => {
            next(error);
        })
})




module.exports = router