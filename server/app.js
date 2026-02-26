// Devs Team - Import the provided files with JSON data of students and cohorts here:

const express = require("express");
const mongoose = require("mongoose");
// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/cohort-tools-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));
//
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// const cohorts = require("./cohorts.json"); // day 2 update
// const students = require("./students.json"); // day 2 update
// MONGOOSE MODELS
const cohortSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  isPrivate: Boolean,
  isAnon: Boolean,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" },
  github: String,
  linkedin: String,
  portfolio: String,
  image: String,
});

const Cohort = mongoose.model("Cohort", cohortSchema);
const Student = mongoose.model("Student", studentSchema);


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
// GET /docs - Serves API documentation HTML
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// GET /api/cohorts - Returns all cohorts from MongoDB
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cohorts" });
  }
});

// GET /api/students - Returns all students from MongoDB
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students" });
  }
});
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});