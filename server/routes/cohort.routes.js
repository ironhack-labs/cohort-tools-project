const express = require("express");
const router = express.Router();
const Cohort = require("../models/cohort.model");

//post /api/cohorts
//create a new cohort 

router.post("/", async (req, res) => {
    try {
        const newCohort = await Cohort.create(req.body);
        res.status(201).json(newCohort);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get("/", async (req, res) => {
    try {
        const cohorts = await Cohort.find();
        res.json(cohorts);
    } catch (error) {
        res.status(500). json({ error: error.message});
    }
});
//get by id route 
router.get("/:chortId", async (req, res) => {
    try {
        const cohort = await Cohort.findById(req.params.cohortId);

        if (!cohort) {
            return res.status(404).json({ error: "Cohort not found" });
        }

        res.json(cohort);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.put("/:cohortId", async (req, res) => {
    try {
        const updatedCohort = await Cohort.findByIdAndUpdate(
            req.params.cohortId,
            req.body,
            {new: true}
        );
        res.json(updatedCohort);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
    });

    router.delete("/:cohortId", async (req, res) => {
        try {
            await Cohort.findByIdAndDelete(req.params.cohortId);
            res.json({ message: "Cohort deleted" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    module.exports = router;