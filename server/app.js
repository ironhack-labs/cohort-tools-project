require("dotenv/config");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

const mongoose = require("mongoose");
const { isAuthenticated } = require("./middleware/jwt.middleware");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const app = express();

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173"],
  })
);

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
// Use the CORS middleware with options to allow requests
// from specific IP addresses and domains.

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", isAuthenticated, (req, res, next) => {
  Cohort.find()
    .then((allCohorts) => res.json(allCohorts))
    .catch((err) => next(err));
});

app.post("/api/cohorts", isAuthenticated, (req, res, next) => {
  Cohort.create(req.body)
    .then((newCohort) => {
      console.log("Cohort created: ", newCohort);
      res.status(201).send(newCohort);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/students", isAuthenticated, (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((allStudents) => res.json(allStudents))
    .catch((err) => next(err));
});

app.post("/api/students", isAuthenticated, (req, res, next) => {
  Student.create(req.body)
    .then((newStudent) => {
      console.log("Student created:", newStudent);
      res.status(201).send(newStudent);
    })
    .catch((err) => {
      console.log(err);
      // res.status(500).json("Internal Server Error") --> headersSent
      next(err);
    });
});

app.get("/api/students/:id", isAuthenticated, (req, res, next) => {
  const studentId = req.params.id;
  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Student retrieved: ", student);
      res.status(200).send(student);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/cohorts/:id", isAuthenticated, (req, res, next) => {
  const cohortId = req.params.id;
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Cohort retrieved: ", cohort);
      res.status(200).send(cohort);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/cohorts/:id", isAuthenticated, (req, res, next) => {
  const cohortId = req.params.id;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Cohort updated: ", updatedCohort);
      res.status(200).send(updatedCohort);
    })
    .catch((error) => {
      next(error);
    });
});

// example.com?cohort=cohortid&sort=asc
// app.get("/api/students", (req, res) => {
//   const cohortId = req.query.cohortId;
//   Student.find({ cohort: cohortId })
//     .then((student) => {
//       console.log("Student retrieved: ", student);
//       res.status(200).send(student);
//     })
//     .catch((error) => {
//       console.error("Failed to retrieve student: ", error);
//       res.status(500).send({ error: "Failed to retrieve student" });
//     });
// });

app.get("/api/students/cohort/:cohortId", isAuthenticated, (req, res, next) => {
  const cohortId = req.params.cohortId;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((student) => {
      console.log("Student retrieved: ", student);
      res.status(200).send(student);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/students/:id", isAuthenticated, (req, res, next) => {
  const studentId = req.params.id;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Student updated: ", updatedStudent);
      res.status(200).send(updatedStudent);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/students/:id", isAuthenticated, (req, res, next) => {
  const studentId = req.params.id;
  Student.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      console.log("Student deleted: ", deletedStudent);
      res.status(200).send();
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/cohorts/:id", isAuthenticated, (req, res, next) => {
  const cohortId = req.params.id;
  Cohort.findByIdAndDelete(cohortId)
    .then((deletedCohort) => {
      console.log("Cohort deleted: ", deletedCohort);
      res.status(200).send();
    })
    .catch((error) => {
      next(error);
    });
});

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// Error handler functions
const {
  errorHandler,
  notFoundHandler,
  // badRequestHandler,
} = require("./middleware/error-handling");

app.use(errorHandler);
// app.use(badRequestHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
