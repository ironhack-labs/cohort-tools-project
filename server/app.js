const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose")
const PORT = 5005

// MODELS

const Cohort = require("./models/cohort.model")
const Student = require("./models/student.model")

// STATIC DATA

const cohortsData = require("./cohorts.json")
const studentsData = require("./students.json")
const { errorHandler, notFoundHandler } = require("./middleware/error-handling")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5005', 'http://localhost:5173']
}))

// DATABASE & MODELS

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// ROUTES

app.get("/docs", (req, res, next) => {
  res.sendFile(__dirname + "/views/docs.html");
})

//-----------ROUTE STUDENTS 
app.get("/api/students", (req, res, next) => {

  Student
    .find({})
    .populate("cohort")
    .then((students) => {
      res.json(students)
    })
    .catch((err) => {
      next(err)
    })
})

app.post("/api/students", (req, res, next) => {

  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Student
    .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
    .then(newStudent => res.sendStatus(201))
    .catch(err => next(err))
})

app.get("/api/students/cohort/:cohortId", (req, res, next) => {

  const { cohortId } = req.params

  Student
    .find({ cohort: cohortId })
    .populate("cohort")
    .then(student => res.json(student))
    .catch(err => next(err))
})

app.get("/api/students/:studentId", (req, res, next) => {

  const { studentId } = req.params

  Student
    .findById(studentId)
    .populate("cohort")
    .then(student => res.json(student))
    .catch(err =>
      next(err)
    )
})

app.put("/api/students/:studentId", (req, res, next) => {

  const { studentId } = req.params

  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Student
    .findByIdAndUpdate(studentId, { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
    .then(editStudent => res.sendStatus(204))
    .catch(err => next(err))
})

app.delete("/api/students/:studentId", (req, res, next) => {

  const { studentId } = req.params


  Student
    .findByIdAndDelete(studentId)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
})


//-----------ROUTE COHORT 

app.get("/api/cohorts", (req, res, next) => {

  Cohort
    .find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts)
      res.json(cohorts)
    })
    .catch((err) => {
      next(err)
    })
})

app.post("/api/cohorts", (req, res, next) => {

  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

  Cohort
    .create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours })
    .then(newCohort => res.sendStatus(201))
    .catch(err => next(err))
})


app.get("/api/cohorts/:cohortId", (req, res, next) => {

  const { cohortId } = req.params

  Cohort
    .findById(cohortId)
    .then(cohort => res.json(cohort))
    .catch(err => next(err))
})

app.put("/api/cohorts/:cohortId", (req, res, next) => {

  const { cohortId } = req.params

  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

  Cohort
    .findByIdAndUpdate(cohortId, { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours })
    .then(editCohort => res.sendStatus(204))
    .catch(err => next(err))
})


app.delete("/api/cohorts/:cohortId", (req, res, next) => {

  const { cohortId } = req.params

  Cohort
    .findByIdAndDelete(cohortId)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
})




// ERROR HANDLING

app.use(notFoundHandler)
app.use(errorHandler)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});