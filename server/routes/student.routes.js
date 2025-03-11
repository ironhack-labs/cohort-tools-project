// routes/students.routes.js

const router = require('express').Router();

const Student = require('../models/Student.model');

router.get("/students", (req, res, next) => {
    Student.find().then((allStudents)=> {
        res.json({students: allStudents});
    }).catch((error)=>{
        res.status(500).json({ message: "Error while retrieving all Students"})
    })
  });

//  POST /students  -  Creates a new student
router.post('/students', (req, res, next) => {

  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
  } = req.body; 

  Student.create({ 
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
     })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the project", err);
      res.status(500).json({ message: "Error while creating the student doc" });
    });
});

router.put("/students/:id", (req, res, next)=>{
    Student.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedStudent) => 
        res.json(updatedStudent)).catch((err) => {
      console.log("Error while updating the student", err);
      res.status(500).json({ message: "Error while updating the student" });
    });
})

router.delete("/students/:id", (req, res, next)=>{
    Student.findByIdAndDelete(req.params.id).then(() => 
        res.json({ message: "Student deleted"})).catch((err) => {
      console.log("Error while deleting the student", err);
      res.status(500).json({ message: "Error while deleting the student" });
    });
})

module.exports = router;
