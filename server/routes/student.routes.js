const router = require("express").Router();
const Student = require("../model/Student.model");
const Cohort = require("../model/Cohort.model");
const data = require("../students.json");

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
  }
});

router.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.findById(id);
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const students = await Student.find({ cohort: cohortId });
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/students", async (req, res) => {
  const { first_name, last_name, email, gender, ip_address } = req.body;

  try {
    const newStudent = await Student.create({
      first_name,
      last_name,
      email,
      gender,
      ip_address,
    });
    res.status(200).json(newStudent);
  } catch (error) {
    console.log(error);
  }
});

router.put("/students/:id", async (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/students/:id", (req, res) => {
  Student.findByIdDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;