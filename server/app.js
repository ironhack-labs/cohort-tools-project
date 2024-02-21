// const express = require("express");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const PORT = 5005;


// app.use(cors({
//   origin: 'http://localhost:5173' // Allow only this origin to access the resources
// }));


// // STATIC DATA
// // Devs Team - Import the provided files with JSON data of students and cohorts here:
// const cohorts = require("./cohorts.json");
// const students = require("./students.json");


// // INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
// const app = express();


// // MIDDLEWARE
// app.use(cors()); 
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/cohort-tools-api', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connection successful'))
//   .catch((err) => console.error('MongoDB connection error:', err));


// // ROUTES - https://expressjs.com/en/starter/basic-routing.html
// // Devs Team - Start working on the routes here:
// // ...
// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });

// // GET /api/cohorts - Return all cohorts as JSON
// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });

// // GET /api/students - Return all students as JSON
// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

// // START SERVER
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// //SCHEMAS

// const cohortSchema = new mongoose.Schema({
//   cohortSlug: { type: String, required: true, unique: true },
//   cohortName: { type: String, required: true },
//   program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"], required: true },
//   format: { type: String, enum: ["Full Time", "Part Time"], required: true },
//   campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"], required: true },
//   startDate: { type: Date, default: Date.now },
//   endDate: Date,
//   inProgress: { type: Boolean, default: false },
//   programManager: { type: String, required: true },
//   leadTeacher: { type: String, required: true },
//   totalHours: { type: Number, default: 360 }
// });

// const Cohort = mongoose.model('Cohort', cohortSchema);


// const studentSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   linkedinUrl: { type: String, default: "" },
//   languages: { type: [String], enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"] },
//   program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"], required: true },
//   background: { type: String, default: "" },
//   image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
//   cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort' },
//   projects: [{ type: String }] // Assuming projects are represented by URLs or project names
// });

// const Student = mongoose.model('Student', studentSchema);


const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const PORT = 5005;

// INITIALIZE EXPRESS APP
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173' // Allow only this origin to access the resources
}));

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cohort-tools-api', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error('MongoDB connection error:', err));

// SCHEMAS
const cohortSchema = new mongoose.Schema({
  cohortSlug: { type: String, required: true, unique: true },
  cohortName: { type: String, required: true },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"], required: true },
  format: { type: String, enum: ["Full Time", "Part Time"], required: true },
  campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 360 }
});

const Cohort = mongoose.model('Cohort', cohortSchema);

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
  languages: { type: [String], enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"] },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"], required: true },
  background: { type: String, default: "" },
  image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort' },
  projects: [{ type: String }] // Assuming projects are represented by URLs or project names
});

const Student = mongoose.model('Student', studentSchema);

// STATIC DATA - For demonstration, might not be needed if you're using MongoDB
const cohorts = require("./cohorts.json");
const students = require("./students.json");

// ROUTES
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
