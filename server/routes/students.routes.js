const express = require("express");
const router = express.Router();
const Student = require("../models/Students.model");

//POST /api/students - Creates a new student
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort
    });

    res.status(201).send("Student Created");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /api/students - Retrieves all of the students in the database collection
router.get("/", async (req, res, next) => {
  try {
    const response = await Student.find().populate("cohort");
    res.json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const response = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET /api/students/:studentId - Retrieves a specific student by id
router.get("/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findById(req.params.studentId).populate("cohort");
    res.json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PUT /api/students/:studentId - Updates a specific student by id
router.put("/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findByIdAndUpdate(req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort
    }, { new: true });
    res.status(202).json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE /api/students/:studentId - Deletes a specific student by id
router.delete("/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.studentId);
    res.status(202).json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
