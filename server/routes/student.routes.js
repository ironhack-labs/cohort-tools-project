
const express= require("express")
const router= express.Router()

const Student = require("../models/Students.model");

router.get("/", (req, res) => {
    Student.find()
      .then((students) => {
        res.status(202).json(students);
      })
      .catch((error) => {
          next(error);
      });
  });
  
  router.post("/", async (req, res) => {
    try {
      const response = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        linkedinUrl: req.body.linkedinUrl,
        languages: req.body.languages,
        program: req.body.program,
        projects: req.body.projects,
      });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  });
  //recuperar todos los estudiantes en la coleccion de la base de datos
  router.get('/cohort/:cohortId', async (req, res) => {
    try{
      console.log(req.params.cohortId)
      const response= await Student.find({cohort: req.params.cohortId})
      .populate('cohort') 
      res.status(200).json(response)
    }catch (error){
      next(error);
    }
  })
  //recuperar un estudiante especifico
  router.get("/:studentId", async (req, res)=>{
    try{
      const response= await Student.findById(req.params.studentId)
      res.status(200).json(response)
    }catch (error){
      next(error)
    }
  })
  //actualiza un estudiante especifico
  
  router.put("/:studentId", async (req, res)=>{
    try {
      const response= await Student.findByIdAndUpdate(req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program:req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: req.body.projects
      }, {new: true})
    res.status(202).json(response)
       } catch (error) {
        next(error)
  }
  })
  
  
  
  //elimina un estudiante especifico
  router.delete("/:studentId", async (req, res)=>{
    try{
      await Student.findByIdAndDelete(req.params.studentId)
      res.status(200).send()
      
    }catch (error){
      next(error)
    }
  })




module.exports = router