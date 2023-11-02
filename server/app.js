const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
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
      console.error("Error", error);
      res.status(500).send({ error: "failed to retrieve cohorts" });
    });
});

const Student = require("./models/Student.model");
app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send({ error: "failed to retrieve students" });
    });
});

app.post("/api/students", (req, res, next) => {
  const newStudent = { ...req.body };
  Student.create(newStudent)
    .then((createdNewStudent) => {
      res.json(createdNewStudent);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send({ error: "Failed creating a new student" });
    });
});

app.get("/api/students", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send({ error: "Failed to retrieve all the students" });
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
    console.error("Error", error);
    res.status(500).send({ error: "Failed to retrieve this cohort students" });
  }
});

app.get("/api/students/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const oneStudent = await Student.findById(studentId).populate("cohort");
    res.json(oneStudent);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send({ error: "Failed to retrieve this student" });
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
    console.error("Error", error);
    res.status(500).send({ error: "Failed to update the student" });
  }
});

app.delete("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send({ error: "Error while deleting content" });
    });
});

app.get("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      res.status(500).json({ message: "error" });
    });
});
app.post("/api/cohorts", (req, res, next) => {
  const oneCohort = { ...req.body };
  Cohort.create(oneCohort)
    .then((createdCohort) => {
      res.json(createdCohort);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send({ message: "Failed creating a new cohort" });
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
      res.status(500).json({ message: "error" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
