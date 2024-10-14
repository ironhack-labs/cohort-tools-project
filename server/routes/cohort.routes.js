const express = require("express")
const router = express.Router()
const Cohort = require("../models/cohort.model")

router.post("/", async (req, res, next) =>{
  try {

    const response = await Cohort.create({ 

      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
   }) 
   res.status(201).json(response)
   console.log(response)
  }   catch (error) {
    next(error)
  }
})
router.get("/", async (req, res, next) => {
  try {
    const response = await Cohort.find()
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})
router.get("/:cohortId", async (req, res, next)=>{
  try {

    const response = await Cohort.findById(req.params.cohortId)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})
router.put("/:cohortId", async (req, res, next) =>{
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId,{     
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
    },{new: true})
     res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})
router.delete("/:cohortId", async (req, res) =>{
  try {

    const response = await Cohort.findByIdAndDelete(req.params.cohortId)
    res.sendStatus(204); // no content added in the response body for 204
    
  } catch (error) {
    next(error)
  }
})

module.exports = router