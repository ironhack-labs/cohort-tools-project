const express = require("express")
const router = express.Router()

const Cohort = require("../models/Cohorts.models");


router.get("/", (req, res) => {
    Cohort.find()
      .then((cohort) => {
        res.status(202).json(cohort);
      })
      .catch((error) => {
        next(error)
      });
  });
//crea un nuevo grupo
router.post("/", async (req, res)=>{
    try {
      const response = await Cohort.create({
        cohortSlug: req.body.cohortSlug,
        cohortName: req.body.cohortName,
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
    } catch (error) {
      next(error)
    }
    }) 
    
    //recuperar un grupo especifico
    router.get("/:cohortId", async (req, res)=>{
      try{
        const response= await Cohort.findById(req.params.cohortId)
        res.status(200).json(response)
      }catch (error){
        next(error)
      }
    })
    //actualiza un grupo especifico
    router.put("/:cohortId", async (req, res)=>{
      try{
          const response= await Cohort.findByIdAndUpdate(req.params.cohortId, {
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
          }, {new: true})
          res.status(202).json(response)
      }catch(error){
        next(error)
      }
    })
    
    //elimina un grupo especifico
    router.delete("/:cohortId", async (req, res)=>{
      try{
        await Cohort.findByIdAndDelete(req.params.cohortId)
        res.status(200).send()
        
      }catch (error){
        next(error)
      }
    })


    module.exports = router