const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const User = require("./models/User.model");
const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT

const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

// New Branch!
// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

const app = express();

const authRouter = require("./routes/auth.routes"); //  <== IMPORT

// MIDDLEWARE
// Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [`http://localhost:${PORT}`],
  })
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/auth", authRouter); //  <== ADD

//POST /api/students - Creates a new student
app.post("/api/students", (req, res, next) => {
  Student.create({
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
    projects: req.body.projects,
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
      console.log(createdStudent);
    })
    .catch((error) => {
      //console.log(error);
      //res.status(500).json({ error: "Error while creating a new student" });
      next(error);
    });
});

//GET /api/students - Retrieves all of the students in the database collection
app.get("/api/students", isAuthenticated, (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      //console.error("Error while retrieving students ->", error);
      //res.status(500).json({ error: "Failed to retrieve students" });
      next(error);
    });
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      //console.error("Error while retrieving students ->", error);
      //res.status(500).json({ error: "Failed to retrieve students" });
      next(error);
    });
});

//GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId", isAuthenticated, (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      if (!student) {
        console.log("Student not found");
        return res.status(404).json({ error: "Student not found" });
      }
      console.log("Retrieved student ->", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      //console.error("Error while retrieving student ->", error);
      //res.status(500).json({ error: "Failed to retrieve student" });
      next(error);
    });
});

//PUT /api/students/:studentId - Updates a specific student by id
app.put("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      //console.error("Error while updating student ->", error);
      //res.status(500).json({ message: "Error while updating a single student" });
      next(error);
    });
});

//DELETE /api/students/:studentId - Deletes a specific student by id

app.delete("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.error("Error while deleting student ->", error);
      //res.status(500).json({ message: "Error while deleting a single student" });
      next(error);
    });
});

//COHORT SECTION

//POST /api/cohorts - Creates a new cohort
app.post("/api/cohorts", (req, res, next) => {
  Cohort.create({
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
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
      console.log(createdCohort);
    })
    .catch((error) => {
      // console.log(error);
      // res.status(500).json({ error: "Error while creating a new cohort" });
      next(error);
    });
});

//Retrieves all of the cohorts in the database collection

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      // console.error("Error while retrieving cohorts ->", error);
      // res.status(500).json({ error: "Failed to retrieve cohorts" });
      next(error);
    });
});

//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      if (!cohort) {
        console.log("cohort not found");
        return res.status(404).json({ error: "cohort not found" });
      }
      console.log("Retrieved cohort ->", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      // console.error("Error while retrieving cohort ->", error);
      // res.status(500).json({ error: "Failed to retrieve cohort" });
      next(error);
    });
});

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      // console.error("Error while updating cohort ->", error);
      // res.status(500).json({ message: "Error while updating a single cohort" });
      next(error);
    });
});

//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id

app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      // console.error("Error while deleting cohort ->", error);
      // res.status(500).json({ message: "Error while deleting a single cohort" });
      next(error);
    });
});

app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
