const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
  })
);
// ...
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
const Cohort = require("./models/Cohort.model");
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      res.json(cohorts);
      console.log(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});
const Student = require("./models/Student.model");
app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      next(error);
    });
});
app.post("/api/students", (req, res, next) => {
  const newStudent = { ...req.body };
  Student.create(newStudent)
    .then((createdNewStudent) => {
      res.json(createdNewStudent);
    })
    .catch((error) => {
      next(error);
    });
});
app.get("/api/students", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) => {
      next(error);
    });
});
app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const oneCohortStudents = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    );
    console.log(oneCohortStudents);
    res.json(oneCohortStudents);
  } catch (error) {
    next(error);
  }
});
app.get("/api/students/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const oneStudent = await Student.findById(studentId).populate("cohort");
    res.json(oneStudent);
  } catch (error) {
    next(error);
  }
});
app.put("/api/students/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  const updatedStudentData = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true }
    );
    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).send({ error: "Student not found" });
    }
  } catch (error) {
    next(error);
  }
});
app.delete("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});
app.get("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});
app.post("/api/cohorts", (req, res, next) => {
  const oneCohort = { ...req.body };
  Cohort.create(oneCohort)
    .then((createdCohort) => {
      res.json(createdCohort);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCorhort) => {
      res.json(updatedCorhort);
    })
    .catch((error) => {
      next(error);
    });
});
app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      next(error);
    });
});

// Import the custom error handling middleware:
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

// Set up custom error handling middleware:
app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
