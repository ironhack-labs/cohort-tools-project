const router = require("express").Router();
const Student = require("../models/Student.model");
const cors = require("cors");

const corsOptions = {
  origin: ['http://localhost:5005', "http://localhost:5173"],
  optionsSuccessStatus: 200
}


router.get("/students", cors(corsOptions), async (req, res) => {
  try {
    const allStudents = await Student.find().populate("cohort");
    res.json(allStudents);
  } catch (error) {
    console.log(error)
  }
})

router.get("/students/cohort/:id", cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;
    const studentsInCohort = await Student.find({ cohort: id }).populate("cohort");

    res.json(studentsInCohort);
  } catch (error) {
    console.log(error)
  }
})

router.get("/students/:id", cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("cohort");
    res.json(student);
  } catch (error) {
    console.log(error)
  }
})

router.post("/students", cors(corsOptions), async (req, res) => {
  const { firstName, lastName, email, phone, likendinUrl, languages, program, background, image, cohort, projects } = req.body;
  try {
    const newStudent = await Student.create({ firstName, lastName, email, phone, likendinUrl, languages, program, background, image, cohort, projects })
    res.json(newStudent)
  } catch (error) {
    console.log(error)
  }
})

router.put("/students/:id", cors(corsOptions), async (req, res) => {

  try {
    (updateStudent) => {
      Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.json(updateStudent)
    }
  } catch {
    (error) => {
      console.log(error)
    }
  }
})

router.delete("/students/:id", cors(corsOptions), async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id)
    res.json({ message: "Student deleted!" })
  } catch {
    (error) => { console.log(error) }

  }
})

module.exports = router;