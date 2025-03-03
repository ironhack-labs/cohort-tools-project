require("dotenv/config");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require('./cohorts.json')
const students = require('./students.json')
const cors = require('cors')
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");
const User = require("./models/User.model")

const { isAuthenticated } = require("./middleware/jwt.middleware");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
mongoose
.connect("mongodb+srv://equipoc:tR1mzcvEfh5rzFMz@cluster0.r1x5c.mongodb.net/cohort-tools-api?retryWrites=true&w=majority")
  .then((x) => {
    console.log(`Connected to Database: "${x.connections[0].name}"`);
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
  
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENTS

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
});

app.post("/api/students", (req, res) => {

  Student.create({
    projects: req.body.projects,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort
  })
    .then((createdStudent) => {
      console.log("Student created ->", createdStudent);
      res.status(201).json(createdStudent)
    })
    .catch((error) => {
      console.log("Error while creating the student ->", error)
      res.status(500).json({ error: "Failed to create the student" })
    })
})

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
})

app.get("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);

      res.status(200).json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).json({ error: "Failed to retrieve student" });
    });
});

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((result) => {
      console.log("Student deleted!");
      res.status(204).send(); // Send back only status code 204 indicating that resource is deleted
    })
    .catch((error) => {
      console.error("Error while deleting the student ->", error);
      res.status(500).json({ error: "Deleting student failed" });
    });
});

app.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Updated student ->", updatedStudent);
      res.status(204).json(updatedStudent);
    })
    .catch((error) => {
      console.error("Error while updating the student ->", error);
      res.status(500).json({ error: "Failed to update the student" });
    });
});

// COHORTS

app.get("/api/cohorts", async (req, res) => {
  const { campus, program } = req.query;

  // Filtra los cohorts según los parámetros
  let query = {};
  if (campus) query.campus = campus;
  if (program) query.program = program;
  try {
    const cohorts = await Cohort.find(query);
    res.status(200).json(cohorts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the cohort" });
  }
})
app.get("/api/cohorts/:cohortId", async (req, res) => {

  try {
    const cohortId = req.params.cohortId;
    console.info(cohortId);
    const cohort = await Cohort.findById(cohortId);
    res.status(200).json(cohort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the cohort" });
  }
})
app.post("/api/cohorts", async (req, res) => {
  try {
    const requestBody = {
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
    }
    const newCohort = await Cohort.create(requestBody);
    res.status(200).json(newCohort);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create the cohort");
  }
})
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });
    res.status(204).json(updatedCohort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the cohort" });
  }
})
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const deletedCohort = await Cohort.findByIdAndDelete(cohortId);
    res.status(204).json(deletedCohort);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete the cohort.");
  }
})

//USER

app.get("/api/users/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      console.log("Retrieved user ->", user);

      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error while retrieving user ->", error);
      res.status(500).json({ error: "Failed to retrieve user" });
    });
})


// Auth Router
const authRouter = require("./routes/auth.routes");   
app.use("/auth", authRouter);

// Error handler

const { errorHandler, notFoundHandler } = require("./middleware/error-handling");

app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});