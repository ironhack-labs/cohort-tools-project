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
// ...
const cohorts = require(__dirname + "/cohorts.json");
const students = require(__dirname + "/students.json");

const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

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
// app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// ------- COHORTS ------- //

app.get("/api/cohorts", (req, res) => {
  // res.json(cohorts);
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

app.post("/api/cohorts", async (req, res, next) => {
  const cohort = { ...req.body };
  Cohort.create(cohort)
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
      console.log("Cohort created");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Retrieved cohort ->", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohort ->", error);
      res.status(500).send({ error: "Failed to retrieve cohort" });
    });
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((cohort) => {
      console.log("Updating cohort ->", cohort);
      res.status(204).json(cohort);
    })
    .catch((error) => {
      console.error("Error while updating cohort ->", error);
      res.status(500).send({ error: "Failed to update cohort" });
    });
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndDelete(cohortId)
    .then((cohort) => {
      console.log("Deleting cohort ->", cohort);
      res.status(204).send();
    })
    .catch((error) => {
      console.error("Error while deleting cohort ->", error);
      res.status(500).send({ error: "Failed to delete cohort" });
    });
});

// ------- STUDENTS ------- //

app.get("/api/students", (req, res) => {
  // res.json(students);
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

app.post("/api/students", async (req, res, next) => {
  const student = { ...req.body };
  Student.create(student)
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
      console.log("Student created");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .populate("cohort", "programManager")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved student ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

app.put("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((student) => {
      console.log("Updating student ->", student);
      res.status(204).json(student);
    })
    .catch((error) => {
      console.error("Error while updating student ->", error);
      res.status(500).send({ error: "Failed to update student" });
    });
});

app.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndDelete(studentId)
    .then((student) => {
      console.log("Deleting student ->", student);
      res.status(204).send();
    })
    .catch((error) => {
      console.error("Error while deleting student ->", error);
      res.status(500).send({ error: "Failed to delete student" });
    });
});

app.get("*", (req, res) => {
  res.status(404).send("404");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
