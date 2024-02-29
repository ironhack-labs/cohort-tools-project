const router = require("express").Router();
const Student = require("../model/Student.model");
const data = require("../students.json");
const populate = require("mongoose");

router.get("/students", async (req, res) => {
  try {
    const studentsAll = await Student.find().populate("cohort");
    res.status(200).json(studentsAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal Server Error"})
  }
});

router.get("/students/cohort/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentsInCohort = await Student.find({ cohort: id }).populate(
      "cohort"
    );
    res.status(200).json(studentsInCohort);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Cohort not found!" });
  }
});

router.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.findById(id).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Student not found!" });
  }
});

router.post("/students", async (req, res) => {
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
    console.log(error);
    res.status(500).json({ message: "Error while creating" });
  }
});

router.put("/students/:id", async (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error while editing" });
    });
});

router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student was deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;