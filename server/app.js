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

// Student Routes

GET /api/students - should return all the cohorts from the static students array

POST /api/students - Creates a new student

GET /api/students - Retrieves all of the students in the database collection

GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort

GET /api/students/:studentId - Retrieves a specific student by id

PUT /api/students/:studentId - Updates a specific student by id

DELETE /api/students/:studentId - Deletes a specific student by id


//Cohort Routes

POST /api/cohorts - Creates a new cohort

GET /api/cohorts - Retrieves all of the cohorts in the database collection

GET /api/cohorts/:cohortId - Retrieves a specific cohort by id

PUT /api/cohorts/:cohortId - Updates a specific cohort by id

DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id




// MONGOOSE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api/cohorts")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));



  // START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

