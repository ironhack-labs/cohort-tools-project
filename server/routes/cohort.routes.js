const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

router.get("/", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting all cohorts" });
      next(error);
    });
});

//Creates a new cohort
router.post("/", async (req, res, next) => {
  try {
    const cohort = { ...req.body };
    const createdCohort = await Cohort.create(cohort);
    res.status(201).json(createdCohort);
  } catch (error) {
    res.status(500).json({ message: "Error while creating a new cohort" });
    next(error);
  }
});

//Retrieves a specific cohort by id
router.get("/:cohortId", async (req, res, next) => {
  try {
    const cohortId = req.params.cohortId;
    const oneCohort = await Cohort.findById(cohortId);
    res.status(200).json(oneCohort);
  } catch (error) {
    res.status(500).json({ message: "Error while getting a specific cohort" });
    next(error);
  }
});

//Updates a specific cohort by id
router.put("/:cohortId", async (req, res, next) => {
  try {
    const cohortId = req.params.cohortId;
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, {
      new: true,
    });
    res.status(200).json(updatedCohort);
  } catch (error) {
    res.status(500).json({ message: "Error while updating a specific cohort" });
    next(error);
  }
});

//Deletes a specific cohort by id
router.delete("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const deletedCohort = await Cohort.findByIdAndDelete(cohortId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error while deleting a specific cohort" });
    next(error);
  }
});

module.exports = router;
