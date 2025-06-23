const router = require("express").Router();

const students = require("../models/students.model");
const cohorts = require("../models/cohorts.model")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

router.get("/students", async(req, res)=>{
  try {
    const allStudents = await students.find()
    res.json(allStudents)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
  
})
// Creates a new student


router.post("/students", async (req, res) => {
  try{ 
    const newStudent = await students.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }
})


// Retrieves all of the students for a given cohort
router.get("/students/cohort/:cohortId", async (req, res) => {
  try {
    
    const cohortStudents = await students.find({cohort:req.params.cohortId}).populate('cohort')
    res.status(200).json(cohortStudents)
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
})

//Retrieves a specific student by id

router.get("/students/:studentId", async(req, res)=>{
  try {
    const student = await students.findById(req.params.studentId).populate("cohort")
    res.status(201).json(student);
    
  } catch (error) {
    res.status(500).json(error);
  }
})
//Updates a specific student by id

router.put("/students/:studentId", async(req, res)=>{
  try {
    const updatedStudent = await students.findByIdAndUpdate(req.params.studentId, req.body, {new: true});
    res.status(200).json(updatedStudent);
    
  } catch (error) {
    res.status(500).json(error)
  }
})
// Deletes a specific student by id
router.delete("/students/:studentsId", async(req, res)=>{
  try {
    const deletedStudent = await students.findByIdAndDelete(req.params.studentsId);
    res.status(200).json(deletedStudent)
    
  } catch (error) {
    res.status(500).json(error)
  }
})



router.get("/cohorts", async (req, res)=>{
  try {
    const allCohorts = await cohorts.find();
  res.json(allCohorts);
  } catch (error) {
     res.status(500).json({error: error.message})
  }
  
})

router.post("/cohorts", async (req, res)=>{
  try {
    const newCohort = await cohorts.create(req.body);
    res.status(201).json(newCohort);
} catch (error) {
  res.status(500).json({error: error.message})
}
})
// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id


router.get("/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await cohorts.findById(req.params.cohortId);
    res.json(cohort);    
  } catch (error) {
    res.status(500).json({error: error.message}); 
  }
}); 
//Updates a specific cohort by id

router.put("/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await cohorts.findByIdAndUpdate(
      req.params.cohortId, req.body, {new:true})
      res.json(updatedCohort);
    } catch (error) {
      res.status(500).json({error: error.message}); 
  }
});
    
router.delete("/cohorts/:cohortId", async (req, res) => {
  try {
    const deletedCohort = await cohorts.findByIdAndDelete(req.params.cohortId);
    res.status(201).json(deletedCohort);
    } catch (error) {
      res.status(500).json({error: error.message}); 
  }
});
router.get("/users/:id", async(req, res) =>{
  try {
    const oneUser = await UserModel.findById(req.params.id)
    res.status(200).json(oneUser);
    
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

module.exports = router;