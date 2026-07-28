import Cohort from "../models/Cohort.model.js";

async function getCohorts(req, res) {
  try {
    const cohorts = await Cohort.find(req.query);
    res.status(200).json(cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting cohorts" });
  }
}

async function getCohort(req, res) {
  try {
    const { cohortId } = req.params;
    const cohort = await Cohort.findById(cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.status(200).json(cohort);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting cohort" });
  }
}

async function createCohort(req, res) {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating cohort" });
  }
}

async function updateCohort(req, res) {
  try {
    const { cohortId } = req.params;
    const updated = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Cohort not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating cohort" });
  }
}

async function deleteCohort(req, res) {
  try {
    const { cohortId } = req.params;
    const deleted = await Cohort.findByIdAndDelete(cohortId);
    if (!deleted) return res.status(404).json({ message: "Cohort not found" });
    res.status(200).json({ message: "Cohort deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting cohort" });
  }
}

export { getCohorts, getCohort, createCohort, updateCohort, deleteCohort };