const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");
// Connection to MongoDB with mongoose
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

// const cohorts = require(`./cohorts.json`);
// const students = require(`./students.json`);

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(
  cors({
    // Add the URLs of allowed origins to this array
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

// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });

// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });

// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

// Student Routes
app.post("/api/students", (req, res, next) => {
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
  } = req.body;

  Student.create({
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
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      next(error);
      // res
      //   .status(500)
      //   .json({ message: "There was an error creating a student" });
    });
});

app.get("/api/students", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((listAllStudents) => {
      res.status(200).json(listAllStudents);
    })
    .catch((error) => {
      next(error);
      //res
      // .status(500)
      // .json({ message: "There was an error getting all students" });
    });
});

app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((studentFromCohort) => {
      res.status(200).json(studentFromCohort);
    })
    .catch((error) => {
      next(error);
      //res.status(500).json({
      //  message: "There was an error getting the student from a given cohort",
    });
});

app.get("/api/students/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((studentById) => {
      res.status(200).json(studentById);
    })
    .catch((error) => {
      next(error);
      // res
      //.status(500)
      // .json({ message: "There was an error getting a student by id." });
    });
});

app.put("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updateStudent) => {
      res.status(200).json(updateStudent);
    })
    .catch((error) => {
      next(error);

      // res
      //   .status(500)
      //   .json({ message: "There was an error updating a student." });
    });
});

app.delete("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).json();
    })
    .catch((error) => {
      next(error);
      //  res
      // .status(500)
      //.json({ message: "There was an error deleting a student." });
    });
});

// Cohort Routes

app.post("/api/cohorts", (req, res, next) => {
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

  const newCohort = {
    cohortSlug: cohortSlug,
    cohortName: cohortName,
    program: program,
    format: format,
    campus: campus,
    startDate: startDate,
    endDate: endDate,
    inProgress: inProgress,
    programManager: programManager,
    leadTeacher: leadTeacher,
    totalHours: totalHours,
  };
  Cohort.create(newCohort)
    .then((createCohort) => {
      res.status(201).json(createCohort);
    })
    .catch((error) => {
      next(error);
      // res
      //   .status(500)
      //   .json({ message: "There was an error creating a new cohort" });
    });
});

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find()
    .then((listOfCohorts) => {
      res.status(200).json(listOfCohorts);
    })
    .catch((error) => {
      next(error);
      // res
      //   .status(500)
      //   .json({ message: "There was an error getting the list of cohorts" });
    });
});

app.get("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohortById) => {
      res.status(200).json(cohortById);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      next(error);
      // res
      // .status(500)
      // .json({ message: "There was an error updating a cohort by id" });
    });
});

app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(204).json();
    })
    .catch((error) => {
      next(error);
      // res
      //   .status(500)
      //   .json({ message: "There was an error deleting a cohort." });
    });
});

//Middleware error handler
app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
