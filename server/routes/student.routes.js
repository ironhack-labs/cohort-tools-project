const express = require("express")
const router = express.Router()
const Student = require("../models/student.model")

//ROUTES STUDENT

router.post("/", async (req, res, next) =>{
  try {
    const response = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages:req.body.languages,
      program:req.body.program,
      background:req.body.background,
      image: req.body.image,
      projects: req.body.projects
    })
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }

})

router.get("/", async (req, res, next)=>{
  try {
    const response = await Student.find().populate("cohort")
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})


router.get("/cohort/:cohortId", async (req, res, next) =>{
  try {
    const response = await Student.find({ cohort: req.params.cohortId }).populate("cohort")// possible populate
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})


// GET a specific student by id
router.get("/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findById( req.params.studentId ).populate("cohort")
    res.status(200).json(response)

    if (!response) {
      return res.status(404).json({ message: "student not found" });
    }

  } catch (error) {
    next(error)
  }
})


// UPDATE a specific student by id
router.put("/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findByIdAndUpdate( req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages:req.body.languages,
      program:req.body.program,
      background:req.body.background,
      image: req.body.image,
      projects: req.body.projects 
    }, { new: true })

    res.status(200).json(response)
    
    
  } catch (error) {
    next(error)
  }
})

// DELETE a specific student by id
router.delete("/:studentsId", async (req, res, next) => {

  try {
    const response = await Student.findByIdAndDelete( req.params.studentsId )
    res.sendStatus(204); // no content added in the response body for 204
    
  } catch (error) {
    next(error)
  }
})

module.exports = router