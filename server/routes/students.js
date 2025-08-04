const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.studentId)) throw { status: 400, message: "Invalid ID" };
    const student = await Student.findById(req.params.studentId);
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
});

router.put("/:studentId", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.studentId)) throw { status: 400, message: "Invalid ID" };
    const updated = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:studentId", async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;