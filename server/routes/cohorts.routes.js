const express = require('express')
const router = express.Router()
const Cohort = require("../models/Cohort.model");

router.get("/", (req, res) => {
  Cohort.find({})
  .then(cohorts => {
    console.log("Retrieved cohorts:", cohorts)
     res.status(200).json(cohorts);
  })
  .catch(error => {
    console.error("Error while retrieving cohorts data", error)
    res.status(500).json({ error: "Failed to retrieve cohorts data"})
  });
});

router.post("/", (req, res) => {
  Cohort.create(req.body)
  .then(createdCohort => {
    console.log("Cohort created", createdCohort)
    res.status(201).json(createdCohort)
  })
  .catch(error => {
    console.error("Error creating cohort", error)
    res.status(500).json( { error: "Failed to create cohort"})
  })
})

router.get("/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
  .then(cohort => {
     console.log("Single cohort", cohort)
    res.status(200).json(cohort)
  })
})

router.put("/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
  .then(updatedCohort => {
    console.log("Updated cohort", updatedCohort)
    res.status(200).json(updatedCohort)
  })
  .catch(error => {
    console.error("Error updating cohort", error)
    res.status(500).json( { error: "Error updating cohort."})
  })
})

router.delete("/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
  .then(result => {
    console.log("Cohort deleted")
    res.status(204).send();
  })
  .catch(error => {
    console.error("Error deleting cohort", error)
    res.status(500).json( {error: "Error deleting cohort"})
  })
})

module.exports = router;