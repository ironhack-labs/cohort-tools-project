const router = require("express").Router();
const Cohorts = require("../models/cohorts.model");

router.post("/cohorts", (req, res, next) => {
  Cohorts.create({ ...req.body })
    .then((cohorts) => res.json(cohorts))
    .catch((error) => {
      next(error);
    });
});

router.get("/cohorts", (req, res, next) => {
  Cohorts.find({})
    .then((cohort) => res.json(cohort))
    .catch((error) => {
      next(error);
    });
});

router.get("/cohorts/:cohortId", (req, res, next) => {
  Cohorts.findById(req.params.cohortId)
    .then((cohort) => res.json(cohort))
    .catch((error) => {
      next(error);
    });
});

router.put("/cohorts/:cohortId", (req, res, next) => {
  const id = req.params.cohortId;
  Cohorts.findByIdAndUpdate(id, req.body, { new: true })
    .then((cohorts) => res.json(cohorts))
    .catch((error) => {
      next(error);
    });
});
router.delete("/cohorts/:cohortId", (req, res, next) => {
  Cohorts.findByIdAndRemove(req.params.cohortId)
    .then((cohort) => res.json(cohort))
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
