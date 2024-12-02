const router = require("express").Router()

const Cohort = require('../models/cohort.model')

router.post('/cohorts', (req, res, next) => {

    Cohort
        .create(req.body)
        .then(createdCohort => res.json(createdCohort))
        .catch(err => next(err))
})


//Read all cohorts
router.get('/cohorts', (req, res, next) => {

    Cohort
        .find()
        .then(allCohorts => res.json(allCohorts))
        .catch(err => next(err))
})


//Read selected cohort
router.get('/cohorts/:cohortId', (req, res, next) => {

    const { cohortId } = req.params

    Cohort
        .findById(cohortId)
        .then(cohortById => res.json(cohortById))
        .catch(err => next(err))
})


//Update cohort
router.put('/cohorts/:cohortId', (req, res, next) => {

    const { cohortId } = req.params

    Cohort
        .findByIdAndUpdate(
            cohortId,
            req.body,
            { new: true }
        )
        .then(newCohortDetails => res.json(newCohortDetails))
        .catch(err => next(err))
})


//Delete student
router.delete('/cohorts/:cohortId', (req, res, next) => {

    const { cohortId } = req.params

    Cohort
        .findByIdAndDelete(cohortId)
        .then(cohortDeleted => res.json(cohortDeleted))
        .catch(err => next(err))
})

module.exports = router