const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5008;
//const PORT = import.meta.env.VITE_PORT;
const TOKEN_SECRET = "1r0Nh4cK";
const cors = require("cors");

const { isAuthenticated } = require("./middleware/jwt.middleware");
//const cohorts = require("./cohorts.json");
//const students = require("./students.json");
const mongoose = require("mongoose");

const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
require("dotenv").config();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes");
app.use("/api/users", isAuthenticated, userRouter);

//require("./error-handling")(app);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

/*
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});
*/

//Students
//Post /api/students
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create({
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
    });
    // console.log(newCohort);
    res.json({ data: newStudent });
  } catch {
    console.log("Error");
  }
});

//get /api/students
app.get("/api/students", (req, res) => {
  Student.find({})

    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

//get /api/students/cohort/:cohortId
app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Student.find({ cohort: cohortId })

    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students from cohort ->", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve students from cohort" });
    });
});

//get /api/students/:studentId
app.get("/api/students/:studentId", (req, res) => {
  console.log(req.params);
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students from cohort ->", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve students from cohort" });
    });
});

//put /api/students/:studentId
app.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })

    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students from cohort ->", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve students from cohort" });
    });
});

//delete /api/students/:studentId
app.delete("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId)

    .then((results) => {
      res.status(204).send();
    })
    .catch((error) => {
      console.error("Error while retrieving students from cohort ->", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve students from cohort" });
    });
});

//Cohorts
//post /api/cohorts
app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create({
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
    });
    // console.log(newCohort);
    res.json({ data: newCohort });
  } catch {
    console.log("Error");
  }
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

//get /api/cohorts/:cohortId
app.get("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)

    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving students from cohort ->", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve students from cohort" });
    });
});

//put /api/cohorts/:cohortId
app.put("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })

    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving students from cohort ->", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve students from cohort" });
    });
});

//delete /api/cohorts/:cohortId
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  const cohortId = req.params.cohortId;
  try {
    // First, check if the cohort exists
    const cohort = await Cohort.findById(cohortId);

    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }

    // Optionally, check if there are any students in this cohort (if required)
    const studentsInCohort = await Student.find({ cohort: cohortId });

    if (studentsInCohort.length > 0) {
      return res.status(400).json({
        error: "Cannot delete cohort, students are associated with it.",
      });
    }

    // Proceed to delete the cohort
    await Cohort.findByIdAndDelete(cohortId);

    return res.status(204).send(); // No content to return after successful deletion
  } catch (error) {
    console.error("Error while deleting cohort ->", error);
    return res.status(500).json({ error: "Failed to delete cohort" });
  }
});

/*
app.get("/api/students", (req, res) => {
  res.json(students);
});
*/
module.exports = app;

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
