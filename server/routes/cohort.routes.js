const router = require("express").Router()

const Cohort = require("../models/Cohort.model")


// GET /cohorts - retrieve all the cohorts
router.get("/cohorts", (req, res) => {
    Cohort.find({})
        .then((cohorts) => {
            console.log("Retrieved cohorts ->", cohorts);
            res.json(cohorts);
        })
        .catch((error) => {
            next(error);
        });
});

//  POST  /cohort route

router.post("/cohorts", (req, res, next) => {
    const newCohort = req.body;

    Cohort.create(newCohort)
        .then((cohortFromDB) => {
            res.status(201).json(cohortFromDB)
        })
        .catch((error) => {
            next(error);
        })
})

// GET /students/cohort/:cohortId

router.get("/students/cohort/:cohortId", (req, res) => {
    Student.find({ cohort: req.params.cohortId })
        .populate("cohort")
        .then(students => res.json(students))
        .catch((error) => {
            next(error);
        });
});

//  GET  /cohorts/:id route
router.get("/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params

    Cohort.findById(cohortId)
        .then((cohortFromDB) => {
            res.json(cohortFromDB)
        })
        .catch((error) => {
            next(error);
        })
})

//  PUT (update) /cohorts/:id route
router.put("/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params
    const newDetails = req.body

    Cohort.findByIdAndUpdate(cohortId, newDetails, { new: true })
        .then((cohortFromDB) => {
            res.json(cohortFromDB)
        })
        .catch((error) => {
            next(error);
        })
})

//  DELETE  /cohorts/:id route

router.delete("/cohorts/:cohortId", (req, res, next) => {

    const { cohortId } = req.params

    Cohort.findByIdAndDelete(cohortId)
        .then((response) => {
            res.sendStatus(204)
        })
        .catch((error) => {
            next(error);
        })
})




module.exports = router