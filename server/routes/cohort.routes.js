const router = require("express").Router();

const Cohort = require("../models/Cohort.model");

const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5005", "http://localhost:5173"],
  optionsSuccessStatus: 200,
};

// GET route

router.get("/cohorts", cors(corsOptions), async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    if (!cohorts) {
      throw new Error("error found");
    }

    res.json(cohorts);
  } catch (error) {
    next(error);
  }
});

// GET route by id

router.get("/cohorts/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const { id } = req.params;
    const cohort = await Cohort.findById(id);
    if (!cohort) {
      throw new Error("error found");
    }

    res.json(cohort);
  } catch (error) {
    next(error);
  }
});

// POST route
router.post("/cohorts", cors(corsOptions), async (req, res, next) => {
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
    if (!newCohort) {
      throw new Error("error found");
    }

    res.json(newCohort);
  } catch (error) {
    next(error);
  }
});

// PUT route
router.put("/cohorts/:id", cors(corsOptions), async (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true });
  try {
    (updateCohort) => {
      if (!updateCohort) {
        throw new Error("error found");
      }

      res.json(updateCohort);
    };
  } catch (error) {
    next(error);
  }
});

// DELETE route
router.delete("/cohorts/:id", cors(corsOptions), async (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.id);
  try {
    () => {
      res.send();
    };
  } catch (error) {
    next(error);
  }
});

module.exports = router;
