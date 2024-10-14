const express = require("express")
const router = express.Router()
const Student = require("../models/Student.model") 


router.get("/", (req,res,next) => {
  Student.find({})
  .populate("cohort")
  .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students)
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
})

//crear Student

router.post("/", async (req, res,next)=>{
  try {

    await Student.create({
      background: req.body.background,
      cohort: req.body.cohort,
      email: req.body.email,
      firstName: req.body.firstName,
      image: req.body.image,
      languages: req.body.languages,
      lastName: req.body.lastName,
      linkedinUrl: req.body.linkedinUrl,
      phone: req.body.phone,
      projects:req.body.projects,
      program: req.body.program,
    })
    console.log(req.body)
    res.status(201).json({message:"Student created successfully"})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId", async (req,res,next)=>{
  try {
    const response = await Student.find({cohort: req.params.cohortId})
    .populate("cohort")
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//Retrieves a specific student by id
router.get("/:studentId", async (req, res,next)=>{
  try {
    const response = await Student.findById(req.params.studentId)
    .populate("cohort")
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//Create a student , Updates a specific student by id


router.put("/:studentId", async (req, res,next)=>{
  try {

    const response = await Student.findByIdAndUpdate(req.params.studentId,{
      background: req.body.background,
      cohort: req.body.cohort,
      email: req.body.email,
      firstName: req.body.firstName,
      image: req.body.image,
      languages: req.body.languages,
      lastName: req.body.lastName,
      linkedinUrl: req.body.linkedinUrl,
      phone: req.body.phone,
      projects:req.body.projects,
      program: req.body.program,
    },{new:true})
    // console.log(req.body)
    res.status(201).json({response,message:"Student changed successfully"})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//Deletes a specific student by id

router.delete("/:studentId",async (req,res,next)=>{
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.status(204).json({message:"Student deleted successfully"})
  
  } catch (error) {
    console.log(error)
    next(error)
    
  }
})


module.exports = router