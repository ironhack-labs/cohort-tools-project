const express = require("express")
const router = express.Router()
const Cohort = require("../models/Cohort.model")

router.post("/", async (req, res,next)=>{
  try {

    const response = await Cohort.create({
      campus: req.body.campus,
      cohortName: req.body.cohortName,
      cohortSlug: req.body.cohortSlug,
      endDate: req.body.endDate,
      format: req.body.format,
      inProgress: req.body.inProgress,
      leadTeacher: req.body.leadTeacher,
      program: req.body.program,
      programManager: req.body.programManager,
      startDate: req.body.startDate,
      totalHours: req.body.totalHours
    })
    console.log("PASAMOS POR AQUI",response)
    res.status(201).json({data:response})
  } catch (error) {
    console.log("estamos en el catch",error)
    next(error)
  }
})



//Retrieves all of the cohorts in the database collection
router.get("/", (req,res,next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts)
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
})

//Retrieves a specific cohort by id

router.get("/:cohortId", async (req, res,next)=>{
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
      next(error)
  }
})


// Updates a specific cohort by id
router.put("/:cohortId", async (req, res,next)=>{
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId,{
      campus: req.body.campus,
      cohortName: req.body.cohortName,
      cohortSlug: req.body.cohortSlug,
      endDate: req.body.endDate,
      format: req.body.format,
      inProgress: req.body.inProgress,
      leadTeacher: req.body.leadTeacher,
      program: req.body.program,
      programManager: req.body.programManager,
      startDate: req.body.startDate,
      totalHours: req.body.totalHours
    },{new:true})
    // console.log(req.body)
    res.status(201).json({message:"Cohort changed successfully"})
  } catch (error) {
    console.log(error)
      next(error)
  }
})



// Deletes a specific cohort by id
router.delete("/:cohortId",async (req,res,next)=>{
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.status(204).json({message:"Cohort deleted successfully"})
  
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router