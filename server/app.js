const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const router = require("express").Router();
const User = require("../models/User.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require('./cohorts.json');
const students = require('./students.json');
const mongoose = require("mongoose");
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Set up CORS middleware here:
// ...
const cors = require('cors'); 
app.use(
  cors({
    origin: ['http://localhost:5173'] 
  })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});
app.get("/api/students", (req, res) => {
  res.json(students);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to the database "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(500).json({ message: "Error to create cohort", error });
  }
});
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Error to obtain cohort", error });
  }
});
app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error to obtain cohort", error });
  }
});
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true } 
    );
    res.status(200).json(updatedCohort);
  } catch (error) {
    res.status(500).json({ message: "Error on updating cohort", error });
  }
});
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(200).json({ message: "Success on deleting cohort" });
  } catch (error) {
    res.status(500).json({ message: "Error on deleting cohort", error });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error on creating student", error });
  }
});
app.put("/api/students/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error on updating student", error });
  }
});
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.status(200).json({ message: "Success on deleting student" });
  } catch (error) {
    res.status(500).json({ message: "Error on deleting studient", error });
  }
});
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error to obtain studients", error });
  }
});
app.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) {
      return res.status(404).json({ message: "Studient not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error to obtain studient", error });
  }
});
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const studentsInCohort = await Student.find({ cohort: cohortId }).populate("cohort");
    
    res.status(200).json(studentsInCohort);
  } catch (error) {
    res.status(500).json({ message: "Error to obtain studients from cohort", error });
  }
});
router.get("/users/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);
module.exports = router;
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

