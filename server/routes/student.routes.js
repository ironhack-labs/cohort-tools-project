const router = require("express").Router();

const Student = require("../models/Students.model");

router.post("/", async (req, res) => {
  try {
    const addStudent = await Student.create(req.body);
    res.json(addStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const singleStudent = await Student.findById(studentId);

    res.json(singleStudent);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const singleCohort = await Student.find({cohort: cohortId}).populate("cohort");
    res.json(singleCohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      message: "Student has been updated!",
      book: updatedStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    await Student.findByIdAndDelete(studentId);

    res.json({ message: "Student was deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
