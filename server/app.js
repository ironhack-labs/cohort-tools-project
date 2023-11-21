const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = 5005;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));
 

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const students = require('./students.json');
const cohorts = require('./cohorts.json')


const cohortsSchema = new Schema ({
      inProgress: Boolean,
      cohortSlug: String,
      cohortName: String,
      program: String,
      format: String,
      campus: String,
      startDate: String,
      endDate: String,
      programManager: String,
      leadTeacher: String,
      totalHours: Number

})

const studentsSchema = new Schema ({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: Array,
  program: String,
  background: String,
  image: String,
  cohort: Number,
  projects: Array

})


const Student = mongoose.model("Student", studentsSchema);
const Cohort = mongoose.model("Cohort", cohortsSchema);

app.get("/students", (req, res)=>{
  Student.find({}).then(students=>{
    console.log("Students", students);
    res.status(200).send(students)
  })

.catch((error) => {
  console.error("Error while retrieving students", error);
  res.status(500).send({ error: "Failed to retrieve students" });
});
})


app.get("/cohorts", (req, res)=>{
  Cohort.find({})
  .then(cohorts=>{
    console.log("cohorts: ", cohorts);
    res.status(200).send(cohorts)
  })
  .catch((error) => {
    console.error("Error while retrieving cohorts", error);
    res.status(500).send({ error: "Failed to retrieve cohorts" });
  });
})


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
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

app.get('/api/cohorts', (req, res)=>{
  res.json(cohorts)
})

app.get('/api/students', (req, res)=>{
  res.json(students)
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});