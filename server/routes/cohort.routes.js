const Cohort = require("../models/Cohort.model.js");
const cohortRouter = require("express").Router();

cohortRouter.get(`/cohorts`, (req, res) => {
  const filter = {};

  if (req.query.campus) {
    filter.campus = req.query.campus;
  }

  if (req.query.program) {
    filter.program = req.query.program;
  }

  console.log(req.query);

  Cohort.find(filter)
    .then((filteredCohorts) => {
      res.status(200).json(filteredCohorts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error filtering cohorts" });
    });
});

cohortRouter.post("/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating a cohort" });
    });
});

cohortRouter.get("/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding a cohort" });
    });
});

cohortRouter.put("/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body)
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating a cohort" });
    });
});

cohortRouter.delete("/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(204).send(); //why not working when sending json after 204
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting a cohort" });
    });
});

module.exports = cohortRouter;
