const Student = require("../models/studentsModel");

const router = require("express").Router();

// GET ALL STUDENTS
router.get("/", (req, res, next) => {
    Student.find()
        .populate('cohort')
        .then((allStudents) => {
            res.status(200).json(allStudents);
        })
        .catch((err) => {
            res.status(500).json({error: "Error while retrieving students"});
        })
})


// GET STUDENT BY ID
router.get("/:studentId", (req, res, next) => {
    const studentId = Number(req.params.studentId);
    Student.findById(studentId)
        .populate('cohort')
        .then((student) => {
            res.status(200).json(student); 
        })
        .catch((error) => {
            res.status(500).json({error: "Error while retrieving a student by ID"});
        })
})


// GET ALL STUDENTS BY COHORT
router.get("/cohort/:cohortId", (req, res, next) => {
    const cohortId = Number(req.params.cohortId); 
    console.log("GET students by cohort - cohortId:", cohortId, "type:", typeof cohortId);
    
    Student.find({cohort: cohortId})
        .populate('cohort')
        .then((students) => {
            console.log("Students found:", students.length);
            console.log("Students data:", students);
            res.status(200).json(students);
        })
        .catch((error) => {
            console.error("Error in GET students by cohort:", error);
            res.status(500).json({error: "Error while retrieving all students by cohort ID"});
        })
})


// CREATE A NEW STUDENT
router.post("/", (req, res, next) => {
    Student
        .create({
            _id: req.body._id,
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            phone: req.body.phone, 
            linkedinUrl: req.body.linkedinUrl, 
            languages: req.body.languages, 
            program: req.body.program,
            background: req.body.background, 
            image: req.body.image,
            cohort: req.body.cohort,
            projects: req.body.projects,
        })
        .then((createdStudent) => {
            res.status(201).json(createdStudent);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while creating a new student"});
        })

})


// UPDATE STUDENT BY ID
router.put("/:studentId", (req, res, next) => {
    const studentId = Number(req.params.studentId);

    Student.findByIdAndUpdate(studentId, req.body, {new: true})
        .then((updatedStudent) => {
            res.status(200).json(updatedStudent);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while updating student"});
        })
    
})


// DELETE STUDENT BY ID
router.delete("/:studentId", (req, res, next) => {
    const studentId = Number(req.params.studentId);

    Student.findByIdAndDelete(studentId)
        .then((result) => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(500).json({error: "Error while deleting student"});
        })
})


module.exports = router;