const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB ", err));
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173"],
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

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
  //res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
  //res.json(students);
});

// POST /api/students
app.post("/api/students", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  } = req.body;

  const newStudent = {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  };

  Student.create(newStudent)
    .then(()=>{
      res.json(newStudent)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
});

// POST /api/cohorts
app.post("/api/cohorts", (req, res, next) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours
  } = req.body;

  const newCohort = {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours
  };

  Cohort.create(newCohort)
    .then(()=>{
      res.json(newCohort)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
});


// GET /api/cohorts/:cohortId
app.get("/api/cohorts/:cohortId", (req, res) => {
  const {cohortId} = req.params;

  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Retrieved cohorts ->", cohort);
      res.json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohort ->", error);
      res.status(500).send({ error: "Failed to retrieve cohort" });
    });
  //res.json(cohorts);
});

// GET /api/students/:studentId
app.get("/api/students/:studentId", (req, res) => {
  const {studentId} = req.params;

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
  //res.json(student);
});


//GET /api/students/cohort/:cohortId
app.get("/api/students/cohort/:cohortId", (req, res) => {
  const {cohortId} = req.params;

  Student.find({cohort : cohortId})
  .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
  //res.json(student);
});

//PUT /api/students/:studentId
app.put("/api/students/:studentId", (req,res,next) =>{
 
  const {studentId} = req.params;

  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  } = req.body;

  const updatedStudent = {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  };

  Student.findByIdAndUpdate(studentId, updatedStudent, {new : true})
    .then(()=>{
      res.json(updatedStudent)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
});

//PUT /api/cohorts/:cohortId
app.put("/api/cohorts/:cohortId", (req,res,next) => {
  const {cohortId} = req.params;

  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours
  } = req.body;

  const updatedCohort = {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours
  };

  Cohort.findByIdAndUpdate(cohortId,updatedCohort, {new : true})
    .then(()=>{
      res.json(updatedCohort)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
})

//DELETE /api/students/:studentId
app.delete("/api/students/:studentId", (req,res,next) =>{
  const{studentId} = req.params;

  Student.findByIdAndDelete(studentId)
    .then(() => {
      res.send(204)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
});

//DELETE /api/cohorts/:cohortId
app.delete("/api/cohorts/:cohortId", (req,res,next) =>{
  const{cohortId} = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then(() => {
      res.send(204)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
