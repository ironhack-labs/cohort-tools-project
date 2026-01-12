
const Cohort = require("../models/cohortModels")

const router = require("express").Router()




router.get("/api/cohorts", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find()
    res.json(cohorts)
  } catch (err) {
    console.log("Error getting cohorts", err)
    res.status(500).json({ error: "Error getting cohorts" })
  }
});

router.post(`/api/cohorts`, async (req, res, next) => {
  try {
    const newCohort = req.body

    const cohortFromDB = await Cohort.create(newCohort)
    res.status(201).json(cohortFromDB)
  } catch (err) {
    console.log("Error create new Cohort", err)
    res.status(500).json({ error: "Error create new Cohort" })
  }
})

router.get(`/api/cohorts/:cohortId`, async (req, res, next) => {
  const { cohortId } = req.params
  try {
    const cohortFromDB = await Cohort.findById(cohortId)
    res.json(cohortFromDB)
  } catch (err) {
    console.log("Error getting cohort ID from DB", err)
    res.status(500).json({ error: "Error getting cohort ID from DB" })
  }
})

router.put(`/api/cohorts/:cohortId`, async (req, res, next) => {
  const { cohortId } = req.params
  const newcohort = req.body
  try {
    const cohortFromDB = await Cohort.findByIdAndUpdate(cohortId, newcohort, { new: true })
    res.json(cohortFromDB)
  } catch (err) {
    console.log("Error updating cohort ID from DB", err)
    res.status(500).json({ error: "Error updating cohort ID from DB" })
  }
})

router.delete(`/api/cohorts/:cohortId`, async (req, res, next) => {
  const { cohortId } = req.params
  try {
    const response = await Cohort.findByIdAndDelete(cohortId)
    res.json(response)
  } catch (err) {
    console.log("Error deleting cohort ID from DB", err)
    res.status(500).json({ error: "Error deleting cohort ID from DB" })
  }
})

module.exports = router