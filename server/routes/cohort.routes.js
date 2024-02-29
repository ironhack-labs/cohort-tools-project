const router = require("express").Router();
const Cohort = require("../model/Cohort.model");
const data = require("../cohorts.json");

router.get("/cohorts", async (req, res, next) => {
  try {
    const allCohorts = await Cohort.find();
    res.status(200).json(allCohorts);
  } catch (error) {
    next(error);
  }
});

router.get("/cohorts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cohort = await Cohort.findById(id);
    res.status(200).json(cohort);
  } catch (error) {
    next(error);
  }
});

router.post("/cohorts", async (req, res, next) => {
  try {
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
    const newCohort = await Cohort.create({
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
    });
    res.status(200).json(newCohort);
  } catch (error) {
    next(error);
  }
});


router.put("/cohorts/:id", async (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/cohorts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cohort.findByIdAndDelete(id);
    res.status(200).json({ message: "Cohort was deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;