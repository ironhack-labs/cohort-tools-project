const router = require("express").Router();
const isAuth = require("./../middleware/isAuthenticated");
const Student = require("./../models/Student.model");
const Cohort = require("./../models/Cohort.models");
router.get("/", (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
      next(error);
    });
});

router.get("/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;
  const eachStudent = await Student.findOne({ _id: id }).populate("cohort");
  res.json(eachStudent);
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    cohort,
    projects,
  } = req.body;

  const studentToCreate = {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    cohort,
    projects,
  };
  const createdStudent = await Student.create(studentToCreate);

  res.status(201).json(createdStudent);
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/cohort/:cohortId", isAuth, async (req, res, next) => {
  const { cohortId } = req.params;
  const studenCohort = await Student.find({ cohort: cohortId }).populate(
    "cohort"
  );
  res.json(studenCohort);
  try {
  } catch (error) {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve students" });
    next(error);
  }
});

router.put("/:id", isAuth, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      cohort,
      projects,
    } = req.body;

    const studentToUpdate = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      cohort,
      projects,
    };
    const updateStudent = await Student.findOneAndUpdate(
      { _id: id },
      studentToUpdate,
      { new: true }
    );
    res.status(202).json(updateStudent);
  } catch (error) {
    res.status(500);
    console.log(error);
    next(error);
  }
});

router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete({ _id: id });
    res.sendStatus(204);
    console.log("deleted");
  } catch (error) {
    res.status(500);
    console.log(error);
    next(error);
  }
});
module.exports = router;
