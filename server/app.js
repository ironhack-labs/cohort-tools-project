require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE

// Research Team - Set up CORS middleware here:
const cors = require("cors");
const mongoose = require("mongoose");
const CohortModel = require("./models/Cohort.model");

const StudentModel = require("./models/Student.model");
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => {
    console.log("Connected to the DB, Nice work!");
  })
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

//Creates a new student
app.post("/api/students", (req, res) => {
  StudentModel.create(req.body)
    .then((data) => {
      console.log("student created", data);
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Retrieves all of the students in the database collection
app.get("/api/students", async (req, res) => {
  try {
    const data = await StudentModel.find().populate("cohort");
    console.log("student found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Retrieves all students from a specific cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const students = await StudentModel.find({ cohort: cohortId }).populate(
      "cohort"
    );

    res.status(200).json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Updates a specific student by id
app.put("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await StudentModel.findById(studentId).populate("cohort");

    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Deletes a specific student by id
app.delete("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(studentId);

    res.status(200).json(deletedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// Creates a new cohort
app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await CohortModel.create(req.body);
    res.status(201).json(newCohort);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
// Retrieves all cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await CohortModel.find();
    res.status(200).json(cohorts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
// Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const cohort = await CohortModel.findById(cohortId);
    res.status(200).json(cohort);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
// Updates a specific cohort by id
app.put("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const updatedCohort = await CohortModel.findByIdAndUpdate(
      cohortId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCohort);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
// Deletes a specific cohort by id
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const deletedCohort = await CohortModel.findByIdAndDelete(cohortId);
    res.status(200).json(deletedCohort);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
