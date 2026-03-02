const express = require("express");

const router= express.Router()
const Student = require("../models/Student.model");
const verifyToken = require("../middlewares/auth.middlewares")
// router.use(verifyToken)
 // you should add (api/students) in the url
router.post("/" , async (req,res, next) =>{
  try {
    //console.log(maria)
    await Student.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})
// you should add (api/students) in the url
router.get("/" , async(req,res, next)=>{
  try {
    const response = await Student.find().populate("cohort")
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})
// you should add (api/students) in the url
router.get("/cohort/:cohortId",async(req,res, next)=>{
  try {
    const {cohortId} =req.params
    const response = await Student.find({"cohort" :cohortId}).populate("cohort")
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})
// you should add (api/students) in the url
router.get("/:studentId" , async(req,res, next)=>{
  try {
    const {studentId} =req.params
    const response = await Student.findById(studentId).populate("cohort")
    if (response.length === 0) {
      res.status(204).json(response)
    } else {
      res.status(200).json(response)
    }
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})
// you should add (api/students) in the url
router.put("/:studentId" , async(req,res, next)=>{
  try {
    const {studentId} =req.params
    const response = await Student.findByIdAndUpdate(studentId, req.body, {new:true})
    res.status(202).json(response)
  }catch (error) {
    console.log(error.message)
    next(error)
  }
})
// you should add (api/students) in the url
router.delete("/:studentId" , async(req,res, next)=>{
  try {
    const {studentId} =req.params
    await Student.findByIdAndDelete(studentId)
    res.sendStatus(200)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})

module.exports = router