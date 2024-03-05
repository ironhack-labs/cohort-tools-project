const router = require('express').Router();
const Cohort = require('../models/Cohort.model');

/* Create our GET all route */
router.get("/cohorts", async (req, res)=>{
    try{
        const allCohort = await Cohort.find()
        res.status(200).json(allCohort);
    }
    catch(error){
        res.status(500).json({message: "Error while creating the Cohort"});
    }
}); 

/* Get by id */
router.get("/cohorts/:id", async (req, res) => {
    try {
        // destructure the id via route params
    const {id} = req.params;
        // find the user via Id.
    const singleCohort = await Cohort.findById(id);
    res.status(200).json(singleCohort);
    }
    catch (error){
        res.status(500).json({message: "Error while creating the Cohort"});
    }
})


/* Create */
router.post("/cohorts", async (req, res) => {
    const {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours} = req.body;

    try{
    const newCohort = await Cohort.create({cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours});

    res.status(200).json(newCohort);
    }
    catch (error) {
        res.status(500).json({message: "Error while creating the Cohort"});
    }
})

/* Update */
router.put("/cohorts/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      const {
        cohortSlug, 
        cohortName, 
        program,
        format,
        campus,
        startDate,
        endDate,
        inProgress, 
        programManager, 
        leadTeacher,
        totalHours} = req.body

        if(!cohortSlug|| !cohortName || !programManager || !leadTeacher){
            return res.status(400).json({message: "Please fill all mandatory fields!"})
          }
      /* Find the user via the id and send it back to the client */
      const updateCohort = await Cohort.findByIdAndUpdate(id, {
        cohortSlug, 
        cohortName, 
        program,
        format,
        campus,
        startDate,
        endDate,
        inProgress, 
        programManager, 
        leadTeacher,
        totalHours
      }, { new: true });
      res.status(200).json(updateCohort);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Cohort"});
    }
  })


  /* Delete */
router.delete("/cohorts/:id", async (req, res) => {
    try {
      /* Destructure the id via route params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
      await Cohort.findByIdAndDelete(id);
      res.status(200).json("Cohort was deleted");
    } catch (error) {
        res.status(500).json({message: "Error while deleting the Cohort"});
    }
  })

module.exports = router;



