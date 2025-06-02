require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 5006;

const middlewareConfig = require("./config/middleware.config");
middlewareConfig(app);

// Making the schema accessible
const Student = require("./models/students.model");
const Cohort = require("./models/cohort.model");

// Mongoose lets you connect to a mongoDB database.
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api") // local host IP
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA

// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohorts = require("./cohorts.json");
const students = require("./students.json");

const cohortRoutes = require("./routes/cohort.routes");
const studentRoutes = require("./routes/student.routes");
const authRouter = require("./routes/auth.routes");

app.use("/", cohortRoutes);
app.use("/", studentRoutes);
app.use("/auth", authRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//Everything that has been replaced and moved to other files.

// MIDDLEWARE

// Research Team - Set up CORS middleware here:
// CORS (Cross-Origin Resource Sharing) is a security feature that allows or blocks
// requests between different domains or ports (frontend on 5173 and backend on 5006).
// const cors = require("cors");
// app.use(cors());

// // Middleware functions run during the request-response cycle and can modify
// // the request (req), response (res), or pass control to the next function.
// app.use(express.json());
// // Logs HTTP requests to the console in a developer-friendly format.
// app.use(morgan("dev"));
// // Serves static files (HTML, CSS, images, etc.) from the "public" directory.
// app.use(express.static("public"));
// // Parses URL-encoded form data and adds it to req.body.
// app.use(express.urlencoded({ extended: false }));
// // Parses cookies attached to the client request and makes them accessible via req.cookies.
// app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html

// POST - COHORT
// app.post("/api/cohorts", (req, res) => {
//   Cohort.create({
//     inProgress: req.body.inProgress,
//     program: req.body.program,
//     campus: req.body.campus,
//     startDate: req.body.startDate, // ✅ fixed from campus
//     endDate: req.body.endDate,
//     programManager: req.body.programManager,
//     leadTeacher: req.body.leadTeacher,
//     totalHours: req.body.totalHours,
//   })
//     .then((createdCohort) => {
//       res.status(201).json(createdCohort);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error while creating a new Cohort",
//       });
//     });
// });

// // POST - STUDENT
// app.post("/api/students", (req, res) => {
//   Student.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     phone: req.body.phone,
//     linkedinUrl: req.body.linkedinUrl,
//     languages: req.body.languages,
//     program: req.body.program,
//     background: req.body.background,
//     image: req.body.image,
//   })
//     .then((createdStudent) => {
//       res.status(201).json(createdStudent);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error while creating a new Student",
//       });
//     });
// });

// GET - ALL COHORTS
// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });

// app.get("/api/cohorts", async (req, res) => {
//   try {
//     const foundCohorts = await Cohort.find();
//     res.json(foundCohorts);
//   } catch (error) {
//     console.log("error receiving cohort", error);
//     res.status(500).json({ message: "Error retrieving cohorts" });
//   }
// });

// GET - ALL STUDENTS
// app.get("/api/students", async (req, res) => {
//   try {
//     const foundStudents = await Student.find();
//     res.json(foundStudents);
//   } catch (error) {
//     console.log("error receiving students", error);
//     res.status(500).json({ message: "Error retrieving students" });
//   }
// });
// app.get("/api/students", async (req, res) => {
//   try {
//     const foundStudents = await Student.find().populate("cohort");
//     res.json(foundStudents);
//   } catch (error) {
//     console.log("error receiving students", error);
//     res.status(500).json({ message: "Error retrieving students" });
//   }
// });

// GET - ALL STUDENTS IN SPECIFIC COHORT
// app.get("/api/students/cohort/:cohortId", async (req, res) => {
//   try {
//     const students = await Student.find({ cohort: req.params.cohortId });
//     res.status(200).json(students);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error while fetching students in cohort" });
//   }
// });
// app.get("/api/students/cohort/:cohortId", async (req, res) => {
//   try {
//     const students = await Student.find({
//       cohort: req.params.cohortId,
//     }).populate("cohort");
//     res.status(200).json(students);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error while fetching students in cohort" });
//   }
// });

// GET - STUDENT BY ID
// app.get("/api/students/:studentId", (req, res) => {
//   Student.findById(req.params.studentId)
//     .then((student) => {
//       res.status(200).json(student);
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Error while fetching student by ID" });
//     });
// });
// app.get("/api/students/:studentId", (req, res) => {
//   Student.findById(req.params.studentId)
//     .populate("cohort")
//     .then((student) => {
//       res.status(200).json(student);
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Error while fetching student by ID" });
//     });
// });

// GET - RETRIEVE A SPECIFIC COHORT BY ID
// app.get("/api/cohorts/:cohortId", (req, res) => {
//   Cohort.findById(req.params.cohortId)
//     .then((cohort) => {
//       res.status(200).json(cohort);
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Error while fetching cohort by ID" });
//     });
// });

// PUT - UPDATE A SPECIFIC STUDENT BY ID
// app.put("/api/students/:studentId", (req, res) => {
//   Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
//     .then((updatedStudent) => {
//       res.status(200).json(updatedStudent);
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Error while updating student" });
//     });
// });

// PUT - UPDATE A SPECIFIC COHORT BY ID
// app.put("/api/cohorts/:cohortId", (req, res) => {
//   Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
//     .then((updatedCohort) => {
//       res.status(200).json(updatedCohort);
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Error while updating cohort" });
//     });
// });

// DELETE - A SPECIFIC STUDENT BY ID
// app.delete("/api/students/:studentId", (req, res) => {
//   Student.findByIdAndDelete(req.params.studentId)
//     .then(() => {
//       res.status(204).send();
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Error while deleting student" });
//     });
// });

// DELETE - A SPECIFIC COHORT BY ID
// app.delete("/api/cohorts/:cohortId", (req, res) => {
//   Cohort.findByIdAndDelete(req.params.cohortId)
//     .then(() => {
//       res.status(204).send();
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Error while deleting cohort" });
//     });
// });

// website.com
// website.com/api
// api.website.com/
