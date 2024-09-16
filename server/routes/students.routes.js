const router = require("express").Router();
const Student = require("../models/Student.model.js");
const cors = require("cors");


const corsOptions = {
  origin: ['http://localhost:5005', "http://localhost:5173"],
  optionsSuccessStatus: 200
}


router.get("/students", cors(corsOptions), async (req, res, next) => {
  
  try {
    const allStudents = await Student.find().populate("cohort");
    if (!allStudents){throw new Error("No students found");}
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
})

router.get("/students/cohort/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const {id} = req.params;
    const studentsInCohort = await Student.find({cohort: id}).populate("cohort");
    if (!studentsInCohort){throw new Error("error found");}
    
    res.json(studentsInCohort);
  } catch (error) {
    next(error);
  }
})

router.get("/students/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const {id} = req.params;
    const student = await Student.findById(id);
    if (!student){throw new Error("error found");}
    
    res.json(student);
  } catch (error) {
    next(error);
  }
})

router.post("/students", cors(corsOptions), async (req, res, next) => {
  const { firstName, lastName, email, phone, likendinUrl, languages, program, background, image, cohort, projects } = req.body;
  try {
    const newStudent = await Student.create({fisrtName, lastName, email, phone, likendinUrl, languages, program, background, image, cohort, projects})
    if (!newStudent){throw new Error("error found");}
    
    res.json(newStudent)
  } catch (error) {
    next(error);
  }
})

router.put("/students/:id", cors(corsOptions), async (req, res, next) => {

  try {
    (updateStudent) => {
    if (!updateStudent){throw new Error("error found");}

      res.json(updateStudent)
    }
  } catch {
    (error) => {
      next(error);
    }
  }
})

router.delete("/students/:id", cors(corsOptions), (req, res, next) => {
  Student.findByIdAndDelete(req.params.id)
  try {
    () => {
      res.send()
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;

