const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cohorts = require(__dirname + "/cohorts.json")
const students = require(__dirname + "/students.json")
const PORT = 5005;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(cors());

/*
  // Use the CORS middleware with options to allow requests
  // from specific IP addresses and domains.
  app.use(
    cors({
      // Add the URLs of allowed origins to this array
      origin: ['http://localhost:5173', 'http://example.com'],
    })
  );
*/



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
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
app.get("/api/cohorts", (req, res)=>{
  res.json(cohorts)
})
app.get("/api/students", (req, res)=>{
  res.json(students)
})

//connecting to db
mongoose
.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error("Error connecting to mongo", err));

//creating Schemas
const cohortsSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: String,
  endDate: String,
  programManager: String,
  leadTeacher: String,
  totalHours: Number
})

const studentsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: Array,
  program: String,
  background: String,
  image: String,
  projects:  Array,
  cohort: String
})

//creating models
const Student = mongoose.model("Student", studentsSchema);
const Cohort = mongoose.model("Cohort", cohortsSchema);

//get request for students
app.get("/students", (req, res)=>{
  Student.find({})
  .then(students=>{
    console.log("students: ", students);
    res.status(200).send(students)
  })
  .catch((error) => {
    console.error("Error while retrieving students", error);
    res.status(500).send({ error: "Failed to retrieve students" });
  });
})

//get request for cohorts
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
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
