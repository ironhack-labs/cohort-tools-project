const router = require("express").Router();
const Student = require("../models/Student.model");
const mongoose = require("mongoose");

//GET /students
router.get("/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
  //res.json(students);
});

// GET /students/:studentId
router.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
  //res.json(student);
});

//GET /students/cohort/:cohortId
router.get("/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cohortId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
  //res.json(student);
});

// POST /students
router.post("/students", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  } = req.body;

  const newStudent = {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  };

  Student.create(newStudent)
    .then(() => {
      res.json(newStudent);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

//PUT /students/:studentId
router.put("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  } = req.body;

  const updatedStudent = {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  };

  Student.findByIdAndUpdate(studentId, updatedStudent, { new: true })
    .then(() => {
      res.json(updatedStudent);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

//DELETE /students/:studentId
router.delete("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Student.findByIdAndDelete(studentId)
    .then(() => {
      res.send(204);
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

module.exports = router;
