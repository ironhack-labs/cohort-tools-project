const router = require("express").Router();
const Student = require("../models/Student.model");
const cors = require("cors");
const populate = require("mongoose");

const corsOptions = {
  origin: 'http://localhost:5005',
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
    const allStudents = await Student.find().populate("cohort");
    const {id} = req.params;
    res.json(allStudents.cohort.findById(id));
  } catch (error) {
      console.log(error)
    }
})

router.get("/students/:id", cors(corsOptions), async (req, res) => {
  try {
    const {id} = req.params;
    const student = await Student.findById(id);
    res.json(student);
  } catch (error) {
    console.log(error)
  }
})

router.post("/student", cors(corsOptions), async (req, res) => {
  const {fisrtName, lastName, email, phone, likendinUrl, languages, program, background, image, cohort, projects} = req.body;
  try {
    const newStudent = await Student.create({fisrtName, lastName, email, phone, likendinUrl, languages, program, background, image, cohort, projects})
    res.json(newStudent)
  } catch (error) {
    console.log(error)
  }
})

router.put("/students/:id", cors(corsOptions), async (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, {new: true})
  try {
    (updateStudent) => {
      res.json(updateStudent)
    }
  } catch {(error) => {
    console.log(error)
  }}
})

router.delete("/students/:id", cors(corsOptions), (req, res) => {
  Student.findByIdAndDelete(req.params.id)
  try {
    () => {
      res.send()
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;