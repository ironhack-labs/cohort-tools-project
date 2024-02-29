const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const students = require("./students.json");
const cohorts = require("./cohorts.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(express.urlencoded({ extended: false }));

const Student = require("./models/Student.model");
const Cohort = require("./models/Cohorts.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const { errorHandler, notFoundHandler } = require('./middleware/errorHandle');
 


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

/* 

GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort


/* Student routes ----------------------------------------------------------- */

app.post("/api/students", async (req, res, next) => {
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
    cohort,
    projects,
  } = req.body;
  try {
    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    /* const student = await Student.cohort.findById(cohortId).populate("cohort"); */
    const student = await Student.find({ cohort: cohortId }).populate("cohort");
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error" });
    next(error);
  }
});

app.get("/api/students", (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved Students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students", error);
      res.status(500).json({ error: "Failed to retrieve students" });
      next(error);
    }); 
    
});

app.get("/api/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("cohort");
    res.status(200).json(student);
  } catch (error) {
    /* res.status(500).json({ message: "Error retrieving student" }); */
    next(error);
  }
});

app.put("/api/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl,
        languages,
        program,
        background,
        image,
        cohort,
        projects,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
    next(error);
  }
});

app.delete("/api/students/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findByIdAndDelete(studentId);
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/* Cohort routes */

/* app.get("/api/cohorts", (req, res) => {
  res.status(200).json(cohorts);
  res.send({
    version: '1.0.0'
  })
}); */

app.post("/api/cohorts", async (req, res, next) => {
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
    totalHours,
  } = req.body;
  try {
    const newCohort = await Cohort.create({
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours,
    });
    res.status(201).json(newCohort);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
      next(error);
    });
});

app.get("/api/cohorts/:id", async (req, res, next) => {
  const cohortId = req.params.id;
  Cohort.findById(cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
      next(error);
    });
});

app.put("/api/cohorts/:id", (req, res, next) => {
  const cohortId = req.params.id;

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error" });
      next(error);
    });
});

app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const cohort = await Cohort.findByIdAndDelete(cohortId);
    res.status(200).json(cohort);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
