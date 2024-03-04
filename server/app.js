const dotenvConfig = require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const User = require("./models/User.model")
const { isAuthenticated } = require("./middleware/jwt.middleware");
const PORT = 5005;

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));


  


const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/auth", require("./routes/auth.routes"));


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// GET /api/cohorts
app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});

// GET /api/cohorts/:cohortId
app.get("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findById(cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      next(error);
    });
});

//POST /api/cohorts
app.post("/api/cohorts", (req, res, next) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      next(error);
    });
});

// PUT /api/cohorts/:cohortId

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE /api/cohorts/:cohortId

app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

// GET /api/students

app.get("/api/students", (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      next(error);
    });
});

// POST /api/students

app.post("/api/students", (req, res, next) => {
  Student.create(req.body)
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((error) => {
      next(error);
    });
});
// GET /api/students/cohort/:cohortId

app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      next(error);
    });
});

// GET /api/students/:studentsId
app.get("/api/students/:studentsId", (req, res, next) => {
  const { studentsId } = req.params;

  Student.findById(studentsId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE /api/cohorts/:cohortId

app.delete("/api/students/:studentsId", (req, res, next) => {
  const { studentsId } = req.params;

  Student.findByIdAndDelete(studentsId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

// PUT /api/students/:studentsId

app.put("/api/students/:studentsId", (req, res, next) => {
  const { studentsId } = req.params;

  Student.findByIdAndUpdate(studentsId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      next(error);
    });
});

//user get request
app.get("/api/users/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

// Import the error handling functions

const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
