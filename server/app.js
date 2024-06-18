const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js")
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const studentData = require("./students.json");
const cohortData = require("./cohorts.json");
const Cohort = require("../models/cohorts.model.js");
const Students = require("../models/students.model.js");

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

const MONGODB_URI = "mongodb://127.0.0.1:27017/cohort-tools-project";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  res.json(cohortData);
});
app.get("/api/students", (req, res) => {
  res.json(studentData);
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const singleCohort = await Cohort.findById(cohortId);
    res.json(singleCohort);
  } catch (error) {
    console.log("here is an error  >>>", error);
    res.json(error);
  }
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((createdCohort) => {
      res.json(createdCohort);
    })
    .catch((err) => {
      console.log("ERROR creating cohort >>>>", err);
      res.json({ message: "Error creating cohort" });
    });
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const singleCohort = await Cohort.findById(cohortId)
    res.json(singleCohort)
  } catch (error) {
    res.json(error);
  }
})

app.delete("/api/cohorts/:cohortId", async (req, res) =>{
  try {
    const { cohortId } = req.params;
    await Cohort.findByIdAndDelete(cohortId);
    res.json({message: "cohort deleted succesfully!"});
  } catch (error) {
    consol.log("error deleting here >>", error);
    res.json(error);
  }
})

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const cohortStudents = await Students.find();
    res.json(cohortStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params
    const singleStudents = await Students.findById(studentId);
    res.json(singleStudents);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const createStudent = await Recipe.create(req.body);
    res.status(201).json(createStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const updatedstudent = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );
    res.json(updatedstudent);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.studentId);
    res.json({ message: "Student Deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


// auth routes setup

// import of the route
const userRouter = require('../routes/auth.routes.js')

// config of the route
app.use('/auth', userRouter)


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
