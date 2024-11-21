const express = require("express");
const Cohort = require("../models/Cohorts.model");
const authRouter = require("./auth.routes");

const cohortRouter = express.Router();

// retrieve all cohorts
cohortRouter.get("/cohorts", async (req, res) => {
  try {
    await Cohort.find().then((cohorts) => {
      res.status(200).json(cohorts);
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cohorts", error });
  }
});

cohortRouter.post("/cohorts", async (req, res) => {
  try {
    await Cohort.create(req.body).then((cohort) => {
      console.log(cohort);
      res.status(201).json(cohort);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating cohort", error });
  }
});

// retrieve a specific cohort by id
authRouter.get("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    await Cohort.findById({ _id: cohortId }).then((cohort) => {
      res.status(200).json(cohort);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cohort", error });
  }
});

// Updates a specific cohort by id
cohortRouter.put("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    await Cohort.findByIdAndUpdate({ _id: cohortId }, req.body).then(
      (cohort) => {
        res.status(200).json(cohort);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cohort", error });
  }
});

// Deletes a specific cohort by id
cohortRouter.delete("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    await Cohort.findByIdAndDelete({ _id: cohortId }).then(() => {
      res.status(204).json();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting cohort", error });
  }
});

module.exports = cohortRouter;
