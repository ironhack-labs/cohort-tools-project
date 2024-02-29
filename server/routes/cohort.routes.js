const router = require("express").Router();
const Cohort = require("../model/Cohort.model");
const data = require("../cohorts.json");

router.get("/cohorts", async (req, res) => {
  try {
    const allCohorts = await Cohort.find();
    res.status(200).json(allCohorts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/cohorts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cohort = await Cohort.findById(id);
    res.status(200).json(cohort);
  } catch (error) {
    console.log(error);
  }
});

router.post("/cohorts", async (req, res) => {
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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/cohorts/:id", async (req, res) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/cohorts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Cohort.findByIdAndDelete(id);
    res.status(200).json({ message: "Cohort was deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;