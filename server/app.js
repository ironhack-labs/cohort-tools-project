const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
//import
const Student = require("./models/Student.model.js");
const Cohort = require("./models/Cohort.model.js")
const app = express(); // INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


  app.use(
    cors({
      origin: ['http://localhost:5173'], 
    })
  );
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());


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
// ...



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
res.sendFile(__dirname + "/views/docs.html")
})

app.get("/api/cohorts", (req, res) => {
  res.status(200).json(cohorts); 
});

app.get("/api/students", (req, res) => {
  res.status(200).json(students); 
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

