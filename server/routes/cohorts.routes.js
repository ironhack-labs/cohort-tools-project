const router = require("express").Router();

const Cohort = require("../models/Cohorts.model");

// Create Cohorts
router.post("/", async (req, res) => {
  try {
    const createdCohort = await Cohort.create(req.body);
    res.status(201).json(createdCohort);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get All Cohorts

router.get("/", async (req, res) => {
  try {
    const allCohort = await Cohort.find();
    res.status(200).json(allCohort);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get a Specific Cohort

router.get("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const singleCohort = await Cohort.findById(cohortId);
    res.json(singleCohort);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Update Cohorts

router.put("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const updatedCohort = await Cohort.findById(cohortId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: "Cohort was updated succesfully! -> ",
      cohort: updatedCohort,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Delete Cohort

router.delete("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    await Book.findByIdAndDelete(cohortId);

    res.json({ message: "Cohort was deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
