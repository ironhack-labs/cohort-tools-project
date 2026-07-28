import express from "express";
import {
  getStudents,
  getStudentsByCohort,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/cohort/:cohortId", getStudentsByCohort);
router.get("/:studentId", getStudent);
router.post("/", createStudent);
router.put("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);

export default router;