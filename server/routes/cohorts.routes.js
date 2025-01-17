const mongoose = require("mongoose");
const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

//Cohorts
const cohorts = require("../cohorts.json");

router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:cohortId", async (req, res, next) => {
  const { cohortId } = req.params;
  if (mongoose.Types.ObjectId.isValid(cohortId)) {
  }
  try {
    const cohort = await Cohort.findById(cohortId);
    res.status(400).json(cohort);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    next(error);
  }
});

router.put("/:cohortId", async (req, res, next) => {
  const { cohortId } = req.params;
  if (mongoose.isValidObjectId(cohortId)) {
    try {
      const updatedBook = await Cohort.findByIdAndUpdate(cohortId, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedCohort);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ message: "invalid id" });
  }
});

router.delete("/:cohortId", async (req, res, next) => {
  const { cohortId } = req.params;
  if (mongoose.isValidObjectId(cohortId)) {
    try {
      await Cohort.findByIdAndDelete(cohortId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ message: "invalid id" });
  }
});
module.exports = router;
