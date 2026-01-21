const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

// GET /api/cohorts - Get all cohorts (with optional filtering)
router.get("/", async (req, res) => {
  try {
    const { campus, program } = req.query;
    const filter = {};

    if (campus) filter.campus = campus;
    if (program) filter.program = program;

    const cohorts = await Cohort.find(filter);
    res.json(cohorts);
  } catch (error) {
    console.error("Error fetching cohorts:", error);
    res.status(500).json({ message: "Error fetching cohorts" });
  }
});

// GET /api/cohorts/:cohortId - Get a cohort by ID
router.get("/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const cohort = await Cohort.findById(cohortId);

    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(cohort);
  } catch (error) {
    console.error("Error fetching cohort:", error);
    res.status(500).json({ message: "Error fetching cohort" });
  }
});

// POST /api/cohorts - Create a new cohort
router.post("/", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    console.error("Error creating cohort:", error);
    res.status(500).json({ message: "Error creating cohort" });
  }
});

// PUT /api/cohorts/:cohortId - Update a cohort by ID
router.put("/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(updatedCohort);
  } catch (error) {
    console.error("Error updating cohort:", error);
    res.status(500).json({ message: "Error updating cohort" });
  }
});

// DELETE /api/cohorts/:cohortId - Delete a cohort by ID
router.delete("/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const deletedCohort = await Cohort.findByIdAndDelete(cohortId);

    if (!deletedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json({ message: "Cohort deleted successfully" });
  } catch (error) {
    console.error("Error deleting cohort:", error);
    res.status(500).json({ message: "Error deleting cohort" });
  }
});

module.exports = router;
