const router = require("express").Router();
const Student = require("../model/Student.model");
const data = require("../students.json");
const populate = require("mongoose");

router.get("/students", async (req, res, next) => {
  try {
    const studentsAll = await Student.find().populate("cohort");
    res.status(200).json(studentsAll);
  } catch (error) {
    next(error);
  }
});

router.get("/students/cohort/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentsInCohort = await Student.find({ cohort: id }).populate(
      "cohort"
    );
    res.status(200).json(studentsInCohort);
  } catch (error) {
    next(error);
  }
});

router.get("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const students = await Student.findById(id).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

router.post("/students", async (req, res, next) => {
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body;

  try {
    const newStudent = await Student.create({
      firstName,
      lastName, 
      email, 
      phone, 
      linkedinUrl, 
      languages, 
      program, 
      background, 
      image, 
      cohort,
      projects
    });
    res.status(200).json(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put("/students/:id", async (req, res, next) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student was deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;