const { Router } = require("express");
const router = Router();

const Cohort = require("../models/Cohorts-model");

router.post("/", (req, res, next) => {
  Cohort.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.lenguages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
  })
    .then((newCohort) => {
      res.status(201).json(newCohort);
    })
    .catch((error) => {
      next(error);
    });
});

// it works
router.get("/", (req, res, next) => {
  Cohort.find()
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});

//it works
router.get("/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});
// it works
router.put("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((cohortId) => {
      res.status(200).json(cohortId);
    })
    .catch((error) => {
      next(error);
    });
});

// it works
router.delete("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
