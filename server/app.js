const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

const studentsSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  linkedinUrl: String,
  languages: String,
  program: String,
  background: String,
  image: String,
  cohort: String,
  projects: String,
});
const Students = mongoose.model("Students", studentsSchema);

const cohortsSchema = new Schema({
  _id: Number,
  cohortSlug: String,
  cohortName: String,
  program: String,
  format: String,
  campus: String,
  startDate: String,
  endDate: String,
  inProgress: Boolean,
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
});
const Cohorts = mongoose.model("cohorts", cohortsSchema);

const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.get("/cohorts", (req, res) => {
  res.json(cohorts);
});
app.get("/students", (req, res) => {
  res.json(students);
});
app.post("/students", (req, res) => {
  Student.create({
    _id: 1,
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
    projects: req.body.projects || [],
  })
    .then((createdStudent) => {
      console.log("Student added ->", createdStudent);

      res.status(201).send(createdStudent);
    })
    .catch((error) => {
      console.error("Error while creating the student ->", error);
      res.status(500).send({ error: "Failed to create the student" });
    });
});

app.get("/api/students", (req, res) => {
  Students.find({})
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((error) => {
      res.status(500).send({ error: "Failed to retrieve students" });
    });  
});
app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  Student.find({ cohort: cohortId })
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students by cohort ->", error);
      res.status(500).send({ error: "Failed to retrieve students by cohort" });
    });
});
app.get("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .then((student) => {
      if (student) {
        res.status(200).send(student);
      } else {
        res.status(404).send({ error: "Student not found" });
      }
    })
    .catch((error) => {
      console.error("Error while retrieving a student by ID ->", error);
      res.status(500).send({ error: "Failed to retrieve a student by ID" });
    });  
});
app.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      if (updatedStudent) {
        res.status(200).send(updatedStudent);
      } else {
        res.status(404).send({ error: "Student not found" });
      }
    })
    .catch((error) => {
      console.error("Error while updating a student by ID ->", error);
      res.status(500).send({ error: "Failed to update a student by ID" });
    });
});

app.delete("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      if (deletedStudent) {
        res.status(200).send(deletedStudent);
      } else {
        res.status(404).send({ error: "Student not found" });
      }
    })
    .catch((error) => {
      console.error("Error while deleting a student by ID ->", error);
      res.status(500).send({ error: "Failed to delete a student by ID" });
    });
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    _id: req.body._id,
    inProgress: req.body.inProgress || false,
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
      console.log("Cohort added ->", createdCohort);
      res.status(201).send(createdCohort);
    })
    .catch((error) => {
      console.error("Error while creating the cohort ->", error);
      res.status(500).send({ error: "Failed to create the cohort" });
    });
});
app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      res.status(200).send(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  Cohort.findById(cohortId)
    .then((cohort) => {
      if (cohort) {
        res.status(200).send(cohort);
      } else {
        res.status(404).send({ error: "Cohort not found" });
      }
    })
    .catch((error) => {
      console.error("Error while retrieving a cohort by ID ->", error);
      res.status(500).send({ error: "Failed to retrieve a cohort by ID" });
    });
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      if (updatedCohort) {
        res.status(200).send(updatedCohort);
      } else {
        res.status(404).send({ error: "Cohort not found" });
      }
    })
    .catch((error) => {
      console.error("Error while updating a cohort by ID ->", error);
      res.status(500).send({ error: "Failed to update a cohort by ID" });
    });
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  Cohort.findByIdAndDelete(cohortId)
    .then((deletedCohort) => {
      if (deletedCohort) {
        res.status(200).send(deletedCohort);
      } else {
        res.status(404).send({ error: "Cohort not found" });
      }
    })
    .catch((error) => {
      console.error("Error while deleting a cohort by ID ->", error);
      res.status(500).send({ error: "Failed to delete a cohort by ID" });
    });
});
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
