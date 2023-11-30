const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose");

const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")

const PORT = 5005;

// Setup mongoose connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


// STATIC DATA
const cohorts = require("./cohorts.json");
const students = require("./students.json")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())


// ROUTES - https://expressjs.com/en/starter/basic-routing.html

// ------ Api endpoints for Cohorts ------ 
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieve cohorts: ", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      res.status(500).send({ message: "Failed getting cohorts: " + error });
    })
})

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed getting a cohort: " + error });
    })
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
    .then((createdCohort) => {
      res.status(200).json(createdCohort)
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while creating a cohort: " + error })
    })

})

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed updating a cohort: " + error })
    })
})

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed deleting a cohort: " + error })
    })
})



// ------ Api endpoints for Students ------ 
app.get("/api/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieve students " + students);
      res.status(200).json(students)
    })
    .catch((error) => {
      res.status(500).send({ message: "Failed getting students: " + error })
    })
})

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId
  Student.find({cohort: cohortId})
    .populate("cohort")
    .then((cohortStudents) => {
      console.log("Retrieve cohort students " + cohortStudents);
      res.status(200).json(cohortStudents)
    })
    .catch((error) => {
      res.status(500).send({ message: "Failed getting cohort students: " + error })
    })
})

app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed getting a student: " + error });
    })
});

app.post("/api/students", (req, res) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
    cohort: req.body.cohortId,
  })
    .then((createdStudent) => {
      res.status(200).json(createdStudent)
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while creating a student: " + error })
    })
})

app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed updating a student: " + error })
    })
})

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed deleting a student: " + error })
    })
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});