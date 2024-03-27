const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 5005;

const Student = require("./models/Students.model");
const Cohort = require("./models/Cohort.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//MONGOOSE
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
  })
);

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(
  cors({
    origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(`${__dirname}/views/docs.html`);
});

//create student
app.post("/api/students", (req, res) => {
  Student.create(req.body)
    .then((createdStudent) => {
      console.log("Student created ->", createdStudent);
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.log("Error while creating new student ->", error);
      res.status(500).json({
        error: "Failed to create new student",
        message: error.message,
      });
    });
});

//retrieve all students
app.get("/api/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("found students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error finding students ->", error);
      res.status(500).send({ error: "Lost students", message: error.message });
    });
});

//get specific student by ID
app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Found student ->", student);

      res.status(200).json(student);
    })
    .catch((error) => {
      console.error("Error while updating the new student ->", error);
      res
        .status(500)
        .json({ error: "internal server error", message: error.message });
    });
});

//update specific student by ID
app.put("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updateStudent) => {
      console.log("Updated student ->", updateStudent);

      res.status(200).json(updateStudent);
    })
    .catch((error) => {
      console.error("Error while updating the new student ->", error);
      res
        .status(500)
        .json({ error: "internal server error", message: error.message });
    });
});

//delete a student
app.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndDelete(studentId)
    .then((student) => {
      console.log("Student deleted!");
      res.status(204).send();
    })
    .catch((error) => {
      console.error("Error while deleting the student ->", error);
      res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    });
});

//retrieve all students from given cohort
app.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((studentsByCohort) => {
      console.log("Found students by cohort ->", studentsByCohort);
      res.status(200).json(studentsByCohort);
    })
    .catch((error) => {
      console.log("Error while searching for students by cohort", error);
      res.status(500),
        json({
          error: "Failed to find students by cohort",
          message: error.message,
        });
    });
});

// Cohort Routes

//create cohort
app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((newCohort) => {
      console.log("new cohort added", newCohort);
      res.status(201).json(newCohort);
    })
    .catch((error) => {
      console.error("Error creating new cohort", error);
      res
        .status(500)
        .json({ error: "Failed to create new cohort", message: error.message });
    });
});

//retrieve all cohorts from collection
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("found cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error finding cohorts ->", error);
      res.status(500).send({ error: "Lost cohorts" });
    });
});

//single cohort
app.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("found cohort", Cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error("Error finding Cohort", error);
      res.status(500).json({ error: "failed to find cohort" });
    });
});

//update cohort
app.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updateCohort) => {
      console.log("updated cohort", updateCohort);
      res.status(200).json(updateCohort);
    })
    .catch((error) => {
      console.error("error updating Cohort", error);
      res.status(500).json({ error: "failed to update cohort" });
    });
});

//delete cohort using the ID
app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndDelete(cohortId)
    .then((cohort) => {
      console.log("Cohort deleted!");
      res.status(204).json({ message: "cohort deleted successfully" });
    })
    .catch((error) => {
      console.error("Error while deleting the cohort ->", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
