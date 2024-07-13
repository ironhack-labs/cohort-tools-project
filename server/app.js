const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json");
const students = require("./students.json");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

mongoose
  .connect("mongodb//:127.0.0.1:27017/cohort-tools-project")
  .then((x) => console.log("Connected to database", x.connections[0].name))
  .catch((err) => console.error("Error connecting to database", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// creating new cohort

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.post("/api/cohorts", (req, res) => {
  console.log("req.body", req.body);

  Cohort.create(req.body)
    .then((newCohort) => {
      console.log("newCohort", newCohort);
      res.json(newCohort);
    })
    .catch((err) => {
      console.error("Failed to add new cohort", err);
      res.status(500).semd({ err: err });
    });
});

//getting all cohort
app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((allCohorts) => {
      console.log("allCohorts", allCohorts);
      res.json(allCohorts);
    })
    .catch((err) => {
      console.log("Error on getting all cohort", err);
      res.status(500).json({ err: err });
    });
});

// getting one specific cohort by id
app.get("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  Cohort.findById(cohortId)
    .then((oneCohort) => {
      console.log("oneCohort", oneCohort);
      res.json(oneCohort);
    })
    .catch((err) => {
      console.log("Error on getting cohort by id", err);
      res.status(500).json({ err: err });
    });
});

// update one specific cohort by id
app.put("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  const updatedData = req.body;

  Cohort.findByIdAndUpdate(cohortId, updatedData, { new: true })
    .then((updatedCohort) => {
      if (!updatedCohort) {
        return res.status(400).json({ error: "Cohort not found" });
      }
      console.log("updatedCohort", updatedCohort);
      res.json(updatedCohort);
    })
    .catch((err) => {
      console.log("Failed to update one specific cohort by id", err);
      res.status(500).json({ error: err });
    });
});

//Delete the one cohort
app.delete("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  Cohort.findByIdAndDelete(cohortId)
    .then((deletedCohort) => {
      console.log("deletedCohort", deletedCohort);
      res.status(204).send();
    })
    .catch((err) => {
      console.error("Error on deleting one cohort", err);
      res.status(500).json({ err: err });
    });
});

//following are student routes

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.post("/api/students", (req, res) => {
  console.log("req.body", req.body);

  Student.create(req.body)
    .then((newStudent) => {
      console.log("newStudent", newStudent);
      res.json(newStudent);
    })
    .catch((err) => {
      console.error("Failed to add student", err);
      res.status(500).send({ err: err });
    });
});

app.get("/api/students", (req, res) => {
  Student.find()
    .then((allStudents) => {
      console.log("allStudents", allStudents);
      res.json(allStudents);
    })
    .catch((err) => {
      console.error("Failed to get all students", err);
      res.status(500).json({ err: err });
    });
});

app.get("/api/students/:studentId", (req, res) => {
  const studentId = req.params.id;

  Student.findbyId(studentId)
    .then((oneStudent) => {
      console.log("oneStudent", oneStudent);
      res.json(oneStudent);
    })
    .catch((err) => {
      console.error("Failed to get the student by ID", err);
      res.status(500).json({ err: err });
    });
});

app.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.id;

  Student.findByIdAndUpdate(studentId)
    .then((updatedStudent) => {
      console.log("updatedStudent", updatedStudent);
      res.json(updatedStudent);
    })
    .catch((err) => {
      console.error("Failed to update the student", err);
      res.status(500).json({ err: err });
    });
});

app.delete("/api/students/:studentId", (req, res) => {
  const studentId = req.params.id;

  Student.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      console.log("deletedStudent", deletedStudent);
      res.status(204).send();
    })
    .catch((err) => {
      console.error("Failed to delete the student", err);
      res.status(500).json({ err: err });
    });
});

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
