const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");
const app = express();
const Student = require("./model/Student.model.js");
const Cohort = require("./model/Cohort.model.js"); 
const cohorts = require("./cohorts.json");
const students = require("./students.json");

app.use (express.urlencoded({ extended: false })); 


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
app.get("/cohorts", (req, res) => {
  Cohort.find({})
  .then ((cohorts) => {
    console.log("Retrieve cohorts ->", cohorts);
    res.json(cohorts)
  })
  .catch((error) =>{
    console.error("Error", error);
    res.status(500).json({error: "Failed to retrieve cohorts"});
  });
})

app.get("/students", (req, res) => {
  Student.find({})
  .then ((students) => {
    console.log("Retrieve students ->", students);
    res.json(students)
  })
  .catch((error) =>{
    console.error("Error", error);
    res.status(500).json({error: "Failed to retrieve students"});
  });
})

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173', 'http://example.com'],
  })
);

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
  res.status(200).json(cohorts);
});
app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

app.post("/api/cohorts", (req, res) => {
  
})



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});