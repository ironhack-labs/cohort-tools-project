const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsData = require('./cohorts.json')
const studentsData = require('./students.json')

const Cohort = require('./models/Cohort.model')
const Student = require('./models/Student.model')

require('./db/database-connection')


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:

const cors = require("cors");

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173']
  })
);

// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// -----STUDENT ROUTES-----
app.get('/api/students', (req, res) => {
  Student

    .find()
    .populate('cohort')
    .select({ firstName: 1, lastName: 1, program: 1 })   // proyección
    .sort({ firstName: 1 })                             // ordenación
    .then(students => res.json(students))
    .catch(err => res.json({ status: 500, error: err }))
})

app.post('/api/students', (req, res) => {
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects, cohort } = req.body


  Student

    .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects, cohort })
    .then(newStudent => res.json(newStudent))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.get('/api/students/cohort/:cohortId', (req, res) => {

  const { cohortId } = req.params

  Student

    .find({ cohort: cohortId })
    .populate('cohort')
    .then(studentCohort => res.json(studentCohort))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})

app.get('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params

  Student

    .findById(studentId)
    .populate('cohort')
    .then(student => res.json(student))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.put('/api/students/:studentId', (req, res) => {

  const { studentId } = req.params
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects, cohort } = req.body

  Student

    .findByIdAndUpdate(studentId, { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects, cohort })
    .then(updatedStudent => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})

app.delete('/api/students/:studentId', (req, res) => {

  const { studentId } = req.params

  Student
    .findByIdAndDelete(studentId)
    .then(() => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


// filtros search params
app.get('/api/students/search', (req, res) => {

  res.send(req.query)
  const { name } = req.query

  Student
    .findById({ firstName: { $regex: name, $options: 'i' } })
    .populate('cohort')
    .select()
    .then(student => res.json(student))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


app.get('/api/students/program', (req, res) => {

})


// -----COHORT ROUTES-----
app.get('/api/cohorts', (req, res) => {
  Cohort
    .find()
    .then(cohorts => res.json(cohorts))
    .catch(err => res.json({ status: 500, error: err }))
})

app.post('/api/cohorts', (req, res) => {

  const { inProgress, cohortSlug, cohortName, program, campus, startDate, endDate, programManager, leadTeacher, totalHours } = req.body

  Cohort
    .create({ inProgress, cohortSlug, cohortName, program, campus, startDate, endDate, programManager, leadTeacher, totalHours })
    .then(newCohort => res.sendStatus(201))
    .catch(err => res.json({ status: 500, error: err }))

})

app.get('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params

  Cohort
    .findById(cohortId)
    .then(cohort => res.json(cohort))
    .catch(err => res.json({ status: 500, error: err }))

})

app.put('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params
  const { inProgress, cohortSlug, cohortName, program, campus, startDate, endDate, programManager, leadTeacher, totalHours } = req.body

  Cohort
    .findByIdAndUpdate(cohortId, { inProgress, cohortSlug, cohortName, program, campus, startDate, endDate, programManager, leadTeacher, totalHours })
    .then(updatedCohort => res.sendStatus(204))
    .catch(err => res.json({ status: 500, error: err }))

})

app.delete('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params

  Cohort
    .findByIdAndDelete(cohortId)
    .then(() => res.sendStatus(204))
    .catch(err => res.json({ status: 500, error: err }))

})



// ERROR HANDLING
// ... all your routes and other middleware ...

// Import the custom error handling middleware:
const { errorHandler, notFoundHandler } = require('./middleware/error-handling');

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});