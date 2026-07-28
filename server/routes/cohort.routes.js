import express from "express";
import {
  getCohorts,
  getCohort,
  createCohort,
  updateCohort,
  deleteCohort,
} from "../controllers/cohort.controller.js";

const router = express.Router();

router.get("/", getCohorts);
router.get("/:cohortId", getCohort);
router.post("/", createCohort);
router.put("/:cohortId", updateCohort);
router.delete("/:cohortId", deleteCohort);

export default router;