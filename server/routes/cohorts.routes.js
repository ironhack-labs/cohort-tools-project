const { default: mongoose } = require("mongoose");
const Cohort = require("../models/Cohort.model");

const router = require("express").Router();
// All routes starts with /api/recipes

router.get("/", async (req, res) => {
  try {
    const cohortsData = await Cohort.find();

    res.json(cohortsData);
  } catch (error) {
    next(error);
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.cohortId)) {
      res.status(500).json("Invalid Id");
    } else {
      const cohortData = await Cohort.findById(req.params.cohortId);

      res.json(cohortData);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);

    res.status(201).json(newCohort);
  } catch (error) {
    next(error);
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedCohort);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.cohortId)) {
      res.status(500).json("Invalid Id");
    } else {
      await Cohort.findByIdAndDelete(req.params.cohortId);

      res.status(204);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
