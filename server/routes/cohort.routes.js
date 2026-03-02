const express = require("express");

const router= express.Router()

const Cohort = require("../models/Cohort.model");
const verifyToken = require("../middlewares/auth.middlewares")
// router.use(verifyToken)
// you should add (api/cohorts) in the url

router.post("/" ,async (req,res, next) =>{
  try {
    await Cohort.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})

router.get("/" , async(req,res, next)=>{
  try {
    const response = await Cohort.find()
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})


router.get("/:cohortId" , async(req,res, next)=>{
  try {
    const {cohortId} =req.params
    const response = await Cohort.findById(cohortId)
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

router.put("/:cohortId" , async(req,res, next)=>{
  try {
    const {cohortId} =req.params
    const response = await Cohort.findByIdAndUpdate(cohortId, req.body, {new:true})
    res.status(202).json(response)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})

router.delete("/:cohortId" , async(req,res, next)=>{
  try {
    const {cohortId} =req.params
    await Cohort.findByIdAndDelete(cohortId)
    res.sendStatus(200)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})

module.exports = router