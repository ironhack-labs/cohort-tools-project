const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;

const Cohorts = require("./models/CohortModel");
const Student = require("./models/StudentModel");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const cohortData = require("./cohorts.json");
const studentData = require("./students.json");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
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
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohorts.find();
    res.status(201).json(cohorts);
  } catch {
    res.status(500).json({ message: "Error fetching cohorts" });
  }
});

app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohorts.create(req.body);
    res.status(201).json(newCohort);
  } catch {
    res.status(500).json({ message: "Error creating cohort" });
  }
});

app.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await Cohorts.findById(req.params.id);
    res.status(201).json(cohort);
  } catch {
    res.status(500).json({ message: "Error fetching cohort" });
  }
});

app.put("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await Cohorts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(cohort);
  } catch {
    res.status(500).json({ message: "Error updating cohort" });
  }
});

app.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await Cohorts.findByIdAndDelete(req.params.id);
    res.status(201).json(cohort);
  } catch {
    res.status(500).json({ message: "Error deleting cohort" });
  }
});

// app.get("/api/students", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(201).json(students);
//   } catch {
//     res.status(500).json({ message: "Error fetching students" });
//   }
// });

app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch {
    res.status(500).json({ message: "Error creating student" });
  }
});

app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("cohort");
    res.status(201).json(student);
  } catch {
    res.status(500).json({ message: "Error fetching student" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const foundStudent = await Student.find().populate("cohort");
    res.status(201).json(foundStudent);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching all students with cohort id" });
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const foundStudent = await Student.findById(req.params.cohortId).populate(
      "cohort"
    );
    res.status(201).json(foundStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching student" });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(student);
  } catch {
    res.status(500).json({ message: "Error updating student" });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(201).json(student);
  } catch {
    res.status(500).json({ message: "Error deleting student" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
