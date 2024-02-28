const router = require('express').Router();
const Cohort = require('../models/Cohort.model');

/* Create our GET all route */
router.get("/cohort", async (req, res)=>{
    try{
        const allCohort = await Cohort.find()
        res.status(200).json(allCohort);
    }
    catch(error){
        res.status(500).json({message: "Error while creating the Cohort"});
    }
}); 

/* Get by id */
router.get("/cohort/:id", async (req, res) => {
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
router.post("/cohort", async (req, res) => {
    const {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours} = req.body;

    try{
    const newCohort = await User.create({cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours});

    res.status(200).json(newCohort);
    }
    catch (error) {
        res.status(500).json({message: "Error while creating the Cohort"});
    }
})

/* Update */
router.put("/cohort/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
      const updateCohort = await Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updateCohort);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Cohort"});
    }
  })


  /* Delete */
router.delete("/cohort/:id", async (req, res) => {
    try {
      /* Destructure the id via route params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
      const deleteCohort = await Cohort.findByIdAndDelete(req.params.id);
      res.status(204).json(deleteCohort);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Cohort"});
    }
  })

module.exports = router;



