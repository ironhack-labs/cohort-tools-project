const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");
const Cohort = require("./models/Cohorts.model")
const Student = require("./models/Students.model")
const StudentData = require("./students.json")
const CohortData = require("./cohorts.json")


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5005', 'http://localhost:5005/docs', 'http://localhost:5005/api/cohorts', 'http://localhost:5005/api/students'],
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log("Connected to Database:"))
  .catch(err => console.error("Error connecting to MongoDB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/cohorts", (req, res) => {
  const query = {}
  Cohort.find(query)
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      res.json(error)
    });
});

app.get("/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});