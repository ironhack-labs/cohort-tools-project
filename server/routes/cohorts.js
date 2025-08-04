const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort");

router.get("/", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (err) {
    next(err);
  }
});

router.get("/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    res.status(200).json(cohort);
  } catch (err) {
    next(err);
  }
});

router.put("/:cohortId", async (req, res, next) => {
  try {
    const updated = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:cohortId", async (req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;