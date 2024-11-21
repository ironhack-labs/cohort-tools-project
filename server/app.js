const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");

const students = require("./models/Student.model");
const cohorts = require("./models/Cohort.model");

const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const User = require("./models/User.model");

const { isAuthenticated } = require("./middleware/jwt.middleware");
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res, next) => {
  res.sendFile(__dirname + "/views/docs.html");
});

////GET for 2 collections
app.get("/students", (req, res) => {
  students
    .find({})
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).json({ error: "Failed to retrieve student" });
    });
});

app.get("/cohorts", (req, res, next) => {
  cohorts
    .find({})
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching cohorts" });
    });
});

///GET for 2 collections by studentId and cohortId
app.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  students
    .findById(studentId)
    .populate("cohort")
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.json(student);
    })
    .catch((err) => {
      console.error("Error getting student:", err);
      res.status(500).json({ error: "Failed to get student" });
    });
});

app.get("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  cohorts
    .findById(cohortId)
    .then((cohort) => {
      if (!cohort) {
        return res.status(404).json({ error: "Cohort not found" });
      }

      res.json(cohort);
    })
    .catch((err) => {
      console.error("Error getting cohort:", err);
      res.status(500).json({ error: "Failed to get cohort" });
    });
});

////
////
////GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
app.get("/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  students
    .find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.error("Error retrieving students by cohort:", err);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

///POST for 2 collections
app.post("/students", (req, res, next) => {
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
    cohort,
    projects,
  } = req.body;

  students
    .create({
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    })
    .then((student) => {
      console.log("Student created:", student);
      res.status(201).json(student);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/cohorts", (req, res, next) => {
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

  cohorts
    .create({
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
    })
    .then((cohort) => {
      console.log("Cohort created:", cohort);
      res.status(201).json(cohort);
    })
    .catch((error) => {
      next(error);
    });
});

/////PUT for 2 collections
app.put("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
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
    cohort,
    projects,
  } = req.body;
  students
    .findByIdAndUpdate(
      studentId,
      {
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl,
        languages,
        program,
        background,
        image,
        cohort,
        projects,
      },
      { new: true }
    )
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      console.error("Error creating student:", err);
      next(err);
    });
});

app.put("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
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

  cohorts
    .findByIdAndUpdate(
      cohortId,
      {
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
      },
      { new: true }
    )
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((err) => {
      console.error("Error updating cohort:", err);
      res.status(500).json({ error: "Failed to update cohort" });
    });
});

/////////DELETE for 2 collections
app.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  students
    .findByIdAndDelete(studentId)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      console.error("Error deleting student:", err);
      res.status(500).json({ error: "Failed to delete student" });
    });
});

app.delete("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  cohorts
    .findByIdAndDelete(cohortId)
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((err) => {
      console.error("Error deleting cohort:", err);
      res.status(500).json({ error: "Failed to delete cohort" });
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((user) => {
      console.log("Retrieved user ->", user);
      res.json(user);
    })
    .catch((error) => {
      console.error("Error while retrieving users ->", error);
      res.status(500).json({ error: "Failed to retrieve users" });
    });
});

app.use("/auth", authRoutes);

app.use("/protected", isAuthenticated, protectedRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
