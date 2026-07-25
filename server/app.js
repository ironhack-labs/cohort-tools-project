const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;

// MODELS
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// MONGOOSE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));


// =========================================================
// ROUTES
// =========================================================

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// --- COHORT ROUTES ---

// GET /api/cohorts - Retrieve all cohorts
app.get("/api/cohorts", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    error.status = 500;
    error.message = "Failed to retrieve cohorts";
    next(error);
  }
});

// POST /api/cohorts - Create a new cohort
app.post("/api/cohorts", async (req, res, next) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    error.status = 500;
    error.message = "Failed to create cohorts";
    next(error);
  }
});

// GET /api/cohorts/:cohortId - Retrieve a specific cohort by id
app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      const error = new Error("Cohort not found");
      error.status = 404;
      return next(error);

    }
    res.status(200).json(updatedCohort);
  } catch (error) {
    error.status = 500;
    error.message = "Failed to retrieve cohort";
    next(error);
  }
  });

// PUT /api/cohorts/:cohortId - Update a specific cohort by id
app.put("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!updatedCohort) {
      const error = new Error("Cohort not found");
      error.status = 404;
      return next(error);

    }
    res.status(200).json(updatedCohort);
  } catch (error) {
    error.status = 500;
    error.message = "Failed to update cohort";
    next(error);
  }
});

// DELETE /api/cohorts/:cohortId - Delete a specific cohort by id
app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!deletedCohort) {
      const error = new Error("Cohort not found");
      error.status = 404;
      return next(error);

    }
    res.status(204).send(); 
  } catch (error) {
    error.status = 500;
    error.messgae ="Failed to delete cohort";
    next(error);

  }
});


// --- STUDENT ROUTES ---

// GET /api/students - Retrieve all students
app.get("/api/students", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    error.status = 500;
    error.message = "Failed to retrieve students";
    next(error);
  }
});

// POST /api/students - Create a new student
app.post("/api/students", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    error.status = 500;
    error.message = "Failed to create student";
    next(error);
  }
});

// GET /api/students/cohort/:cohortId - Retrieve all students for a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    error.status = 500;
    error.message = "Failed to retrieve students for the cohort";
    next(error);
  }
});

// GET /api/students/:studentId - Retrieve a specific student by id
app.get("/api/students/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) {const error = new Error ("Student not found");
      error.status = 404;
      return next(error);
    }
      
    res.status(200).json(student);

  } catch (error) {
    error.status = 500;
    error.message = "Failed to updatestudent";
    next(error);
  }
});

// PUT /api/students/:studentId - Update a specific student by id
app.put("/api/students/:studentId", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    if (!updatedStudent) {
      const error = new Error ("Student not found");
      error.status = 404;
      return next(error);
    }
      
    res.status(200).json(updatedStudent);

  } catch (error) {
    error.status = 500;
    error.message = "Failed to delete student";
    next(error);
  }
});

// DELETE /api/students/:studentId - Delete a specific student by id
app.delete("/api/students/:studentId", async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
    if (!deletedStudent) {
      const error = new Error("Student not found");
      error.status = 404;
      return next(error);
    }
    res.status(204).send(); 

  } catch (error) {
    error.status = 500;
    error.message = "Failed to delete student";
    next(error);
  }
});

// =========================================================
// ERROR HANDLING
// =========================================================
  //404 

  app.use((req, res) => {
    res.status(404).json ({
      message: "Route not found"
    });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  });

});




// =========================================================
// START SERVER
// =========================================================
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});