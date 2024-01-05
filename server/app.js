const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const mongoose = require("mongoose");

const Cohort = require("./models/Cohort");
const Student = require("./models/Student");

// CONNECT TO THE DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohorts = require("./cohorts.json");
const students = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Get - Read All
app.get("/api/students", (req, res) => {
  Student.find()
    .then((foundStudents) => {
      res.json(foundStudents);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Student Routes -- Brandon, Lisi
// POST for /api/students - Creates a new student
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
    cohort: req.body.cohort,
    projects: req.body.cohort,
  })
    .then((createdStudent) => {
      console.log("Student added ->", createdStudent);
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.error("Error while creating student ->", error);
      res.status(500).json({ error: "Failed to create the student" });
    });
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .then((students) => {
      console.log("Retrieved students => ", students);
      res.status(200).json(students);
    })
    .catch((err) => {
      console.log("Error while retrieving students => ", err);
      res.status(500).json({ err: "Failed to retrieve students" });
    });
});

//GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(500).json({ err: "Failed" });
    });
});

//PUT /api/students/:studentId - Updates a specific student by id
app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log(updatedStudent);
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE /api/students/:studentId - Deletes a specific student by id
app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((result) => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(500).json({ err: "Deleting student failed" });
    });
});

// Cohort Routes -- Santi, Michael
// POST /api/cohorts - Creates a new cohort
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
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      console.log("Cohort added ->", createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch((err) => {
      console.error("Error while creating the cohort ->", err);
    });
});

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((foundCohorts) => {
      res.json(foundCohorts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((foundCohorts) => {
      res.json(foundCohorts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// PUT /api/cohorts/:cohortId - Updates a specific cohort by id
app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log(updatedCohort);
      res.status(200).send(updatedCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((deletedCohort) => {
      console.log(deletedCohort);
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
