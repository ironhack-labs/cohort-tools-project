const { Router } = require("express");
const router = Router();
const CohortModel = require("../models/cohort.js");

router.post("/", async (req, res, next) => {
  try {
    const created = await CohortModel.create(req.body);
    return res.status(201).json({ msg: "Cohort registered", created });
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

//GET all cohorts from MongoDB
router.get("/", async (req, res, next) => {
  try {
    const cohorts = await CohortModel.find();
    res.json(cohorts);
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

//get one cohort from MongoDB
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cohort = await CohortModel.findById(id);

    if (!cohort) {
      const error = new Error("Cohort not found");
      error.status = 404;
      throw error;
    }

    return res.status(200).json(cohort);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
});

//update cohort
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    } = req.body;

    const programArr = program?.split(",") || [];
    const formatArr = format?.split(",") || [];
    const campusArr = campus?.split(",") || [];

    const updated = await CohortModel.findByIdAndUpdate(
      id,
      {
        cohortSlug,
        cohortName,
        program: programArr,
        format: formatArr,
        campus: campusArr,
        startDate,
        endDate,
        inProgress,
        programManager,
        leadTeacher,
        totalHours,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      const error = new Error("Cohort not found for update");
      error.status = 404;
      throw error;
    }

    return res.status(200).json({ msg: "Cohort updated", updated });
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
});

//Delete cohort

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cohortDeleted = await CohortModel.findByIdAndDelete(id);

    if (!cohortDeleted) {
      const error = new Error("Cohort not found for deletion");
      error.status = 404;
      throw error;
    }

    return res.status(200).json({ msg: "Cohort deleted" });
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
});

module.exports = router;
