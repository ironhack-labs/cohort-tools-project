const router = require("express").Router()

const Cohort = require("../models/Cohort.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/api/cohorts", isAuthenticated, (req, res) => {

  const newCohort = req.body

  Cohort.create(newCohort)
    .then((cohort) => {
      res.status(201).json(cohort)
    })
    .catch((err) => {
      console.log("error creating a new cohort...", err)
      res.status(500).json({ error: "Error creating a new cohort in the DB..." })
    })
})

router.get("/api/cohorts", (req, res) => {
  Cohort
    .find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts", cohorts)
      res.json(cohorts)
    })
    .catch((err) => {
      console.log("Error while retrieving cohorts")
      next(err)
    })
})

router.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params

  Cohort.findById(cohortId)
    .then((cohort) => {
      res.json(cohort)
    })
    .catch((err) => {
      console.log("error getting a new cohort...")
      next(err)
    })
})

router.put("/api/cohorts/:cohortId", isAuthenticated, (req, res) => {
  const { cohortId } = req.params
  const newDetails = req.body

  Cohort.findByIdAndUpdate(cohortId, newDetails, { new: true })
    .then((cohort) => {
      res.json(cohort)
    })
    .catch((err) => {
      console.log("error updating a new cohort...")
      next(err)
    })
})

router.delete("/api/cohorts/:cohortId", isAuthenticated, (req, res) => {
  const { cohortId } = req.params

  Cohort.findByIdAndDelete(cohortId)
    .then((cohort) => {
      res.status(204).json(cohort)
    })
    .catch((err) => {
      console.log("error deleting a new cohort...")
      next(err)
    })
})


module.exports = router