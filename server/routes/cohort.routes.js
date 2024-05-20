const router = require("express").Router();
const mongoose = require("mongoose");

const Student = require("../models/Student.model");
const Cohort = require("../models/Cohort.model");

// Retrieves all
router.get("/cohorts", (req, res) => {
  console.log("--->", req.query);

  Cohort.find(req.query)
    .then((cohorts) => res.status(200).json(cohorts))
    .catch((err) => res.status(500).json({ "error-message": err.message }));
});

// Creates a new one
router.post("/cohorts", (req, res) =>
  Cohort.create(req.body)
    .then((cohort) => res.status(201).json(cohort))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Retrieves a sfic one by id
router.get("/cohorts/:cohortId", (req, res) =>
  Cohort.findById(req.params.cohortId)
    .then((cohort) => res.status(200).json(cohort))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Updates a specific one by id
router.put("/cohorts/:cohordId", (req, res) =>
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((cohort) => res.status(200).json(cohort))
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

// Deletes a specific one by id
router.delete("/cohorts/:cohortId", (req, res) =>
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).json({ "error-message": err.message }))
);

module.exports = router;
