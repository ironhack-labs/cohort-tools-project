const router = require("express").Router();

const Cohort = require("../models/Cohort.model");

const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:5005',
    optionsSuccessStatus: 200 
  }

// GET route 

router.get("/cohorts", cors(corsOptions), async (req, res) => {
    try {
        const cohorts = await Cohort.find();
        res.json(cohorts);
    }
    catch (error){
        console.log(error);
    }
});

// GET route by id 

router.get("/cohorts/:id", cors(corsOptions), async (req, res) => {
   try{
    const {id} = req.params;
    const cohort = await Cohort.findById(id);
    res.json(cohort);
   }
   catch (error){
    console.log(error);
   }
});

// POST route
router.post("/cohorts", cors(corsOptions), async (req, res) => {
    try{
        const {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours} = req.body;
        const newCohort = await Cohort.create({cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours});
        res.json(newCohort);
    }
    catch (error){
        console.log(error);
    }
});

// PUT route
router.put("/cohorts/:id", cors(corsOptions), async (req, res) => {
    Cohort.findByIdAndUpdate(req.params.id, req.body, {new: true});
    try{
        (updateCohort) => {
            res.json(updateCohort);
        }
    }
    catch (error){
        console.log(error);
    }
});

// DELETE route 
router.delete("/cohorts/:id", cors(corsOptions), async (req, res) => {
    Cohort.findByIdAndDelete(req.params.id)
    try{
        () => {
            res.send();
        }
    }
    catch (error){
        console.log(error);
    }
});



module.exports = router;
