const router = require("express").Router()
const Student = require("../models/students.model")

router.post("/", (req, res, next) => {
    Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        linkedinUrl: req.body.linkedinUrl,
        languages: req.body.languages,
        program: req.body.program,
        background: req.body.background,
        image: req.body.image,
        cohort: req.body.cohort,
    })
    .then((createdStudent) => {
        res.status(201).json(createdStudent)
    })
    .catch((error) => {
        // res.status(500).json({message: "Error while creating new student"})
        next(error)
    })
})


//GET:  /api/students
router.get("/", (req, res, next) => {
    Student.find({}, {firstName: 1, background: 1}).populate('cohort')
    // Student.find().populate({path:'cohort', populate: {
    //     path: "leadTeacher"
    // }})
        .then((allStudents) => {
            res.status(200).json(allStudents)
        })
        .catch((error) => {
            // res.status(500).json({message:"Error to get all students"})
            next(error)
        })
})


//GET:    /api/students/cohort/:cohortId

// ASK FLORIAN LATER

router.get("/cohort/:cohortId", (req, res, next) => {
    const cohortId = req.params.cohortId;

    Student.find({ cohort: cohortId }).populate("cohort")
        .then(students => {
            res.json(students);
        })
        .catch(error => {
            // res.status(500).json({ error: 'An error occurred.' });
            next(error)
        });
});

//GET :   /api/students/cohort/:cohortId
router.get("/:studentId", (req, res, next) => {
    Student.findById(req.params.studentId).populate("cohort")
        .then((student) => {
            res.status(200).json(student)
        })
        .catch((error) => {
            // res.status(500).json({message: "Error"})
            next(error)
        })
})

//PUT :   /api/students/:studentId
router.put("/:studentId",(req, res, next) => {
    Student.findByIdAndUpdate(req.params.studentId, req.body, {new:true})
        .then((updatedStudent) => {
            res.status(200).json(updatedStudent)
        })
        .catch((error) => {
            // res.status(500).json({message: "Error while updating a student"})
            next(error)
        })
})

//DELETE:  /api/students/:studentId
router.delete("/:studentId", (req, res, next) => {
    Student.findByIdAndDelete(req.params.studentId)
        .then(() =>{
            res.status(204).send()
        })
        .catch((error) => {
            // res.status(500).json({message: "Error while deleting a single student"})
            next(error)
        })
})

module.exports = router