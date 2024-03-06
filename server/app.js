const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// const importedStudents = require("./students.json")
const Student = require("./models/Student.model");
//console.log(importedStudents)
// const importedCohorts = require("./cohorts.json")
const Cohort = require("./models/Cohort.model");
//console.log(importedCohorts)

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/docs", (req, res, next) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// app.get("/api/students", (req, res) => {
//   res.json(importedStudents)
// })

// STUDENT ROUTES

// obtener todos los estudiantes
app.get("/api/students", (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved student ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

// crear nuevo estudiante
app.post("/api/students", async (req, res, next) => {
  console.log(req.body);

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

  try {
    const response = await Student.create({
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
    });
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

// obtener estudiantes de un cohort determinado por id
app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  const cohortId = req.params.cohortId;

  try {
    const response = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    );
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

// obtener un estudiante especifico por id
// CON EL QUE HEMOS CREADO NOSOTROS NO FUNCIONA EL POPULATE
app.get("/api/students/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

// actualiza estudiante por id
app.put("/api/students/:studentId", async (req, res, next) => {
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

  try {
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
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
        projects,
        cohort,
      },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// elimina un estudiante por id
app.delete("/api/students/:studentId", async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: "estudiante borrado" });
  } catch (error) {
    console.error(error);
  }
});

// COHORT ROUTES

// app.get("/api/cohorts", (req, res) => {
//   res.json(importedCohorts)
// })

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohort ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

// crear un cohort
app.post("/api/cohorts", async (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  try {
    const response = await Cohort.create({
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    });
    res.json({ message: "cohort creado!" });
  } catch (error) {
    console.error(error);
  }
});

// mostrar detalles de un cohort
app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

// actualiza un cohort por id
app.put("/api/cohorts/:cohortId", async (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  try {
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      {
        cohortSlug,
        cohortName,
        program,
        format,
        campus,
        startDate,
        endDate,
        inProgress,
        programManager,
        leadTeacher,
        totalHours,
      },
      { new: true }
    );
    res.json(response)
  } catch (error) {
    console.error(error)
  }
});

// borrar un cohort
app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {

    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.json({message: "cohort borrado"})
    
  } catch (error) {
    console.error(error)
  }
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
