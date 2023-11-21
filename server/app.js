const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohorts = require('./cohorts.json')
const students = require('./students.json')
const cors = require("cors");


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
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

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// MONGOOSE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api/cohorts")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


  const cohortsSchema = new Schema({
    cohortSlug: {
      type: String,
      required: true,
    },
    cohortName: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    format: {
      type: String,
      enum: ["Full Time", "Part Time"],
    },
    campus:{
      type: String,
      enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"],
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
    },
    inProgress:{
      type: Boolean,
      default: false,
    },
    programManager:{
      type: String,
      required: true,
    },
    leadTeacher:{
      type: String,
      required: true,
    },
    totalHours:{
      type: Number,
      default: 360,
    },
  });

  const Cohort = mongoose.model("Cohort", cohortsSchema);




const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    default: '',
  },
  languages: {
    type: [String],
    enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"],
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: 'https://i.imgur.com/r8bo8u7.png',
  },
  cohort: {
    type: Schema.Types.ObjectId,
    ref: 'Cohort',
  },
  projects: {
    type: Array,
  },
});

const Student = mongoose.model('Student', studentSchema);