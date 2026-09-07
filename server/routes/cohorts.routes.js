const express = require("express")
const router = express.Router()

const Cohort = require("../models/cohorts.model")

router.get("/", (req, res, next) => {
  Cohort.find(req.query)
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
     next(error)
    });
});

// create cohort
router.post("/", (req, res, next) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  Cohort.create({
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  })
    .then((cohort) => {
      res.status(201).json(cohort);
    })
    .catch((error) => {
      next(error)
    });
});

// get cohort detail
router.get("/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
    next(error)
    });
});

// update single cohort detail
router.put("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {returnDocument:"after"})
  .then((updatedCohort) => {
    res.status(200).json(updatedCohort)
  })
   .catch((error) => {
next(error)
    });
})

// delete one cohort
 router.delete("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
   .then((cohort) => {
    res.status(204).json(cohort)
  })
   .catch((error) => {
next(error)
    });
}) 

module.exports = router