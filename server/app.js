const Cohorts = require("./models/Cohorts-model.js");
const Students = require("./models/Students-model.js");
const express = require("express");
const morgan = require("morgan");
const PORT = 5005;
// const cohorts = require("./cohorts.json")
// const students = require("./students.json")
const cors = require("cors");

const mongoose = require("mongoose");

// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ...
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => {
    console.log("connected to mongodb");
  })

  .catch((error) => {
    console.log("error");
  });

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohorts.find()
    .then((data) => {
      res.json(data);
    })

    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

app.get("/api/students", (req, res) => {
  Students.find()
  .populate("cohort")
    .then((data) => {
      res.json(data);
    })

    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    });
});
//STUDENT ROUTES
app.post("/api/students", (req, res) => {
  Students.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.lenguages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
  })
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({message: "error"})
    });
});
//it works
app.get("/api/students", (req, res)=>{
  Students.find()
  .populate("cohort")
  .then((students)=>{
    res.status(200).json(students)
  })
  .catch((error)=>{
    res.status(500).json({message: "error"})
  })
})

//it works
app.get("/api/students/cohort/:cohortId", (req, res)=>{
  const cohortId = req.params.cohortId
  Students.find({cohort: cohortId})
  .populate("cohort")
  .then((students)=>{
    res.status(200).json(students)
  })
  .catch((error)=>{
    res.status(500).json({message: "error"})
  })
})

//it works
app.get("/api/students/:studentId", (req, res)=>{
  const studentId = req.params.studentId
  Students.findById(studentId)
  .populate("cohort")
  .then((students)=>{
    res.status(200).json(students)
  })
  .catch((error)=>{
    res.status(500).json({message: "error"})
  })
})
//it works
app.put("/api/students/:studentId", (req, res)=>{
    Students.findByIdAndUpdate(req.params.id, req.body,{new: true})
    .then((studentsId)=>{
        res.status(200).json(studentsId)
    })
    .catch((error)=>{
        res.status(500).json({message: "error"})
    })
})
// it works
app.delete("/api/students/:studentId", (req, res)=>{
    Students.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send()
    })
    .catch((error)=>{
        res.status(500).json({message: "error"})
    })
})
//COHORT ROUTES
// it works
app.post("/api/cohorts", (req, res) => {
  Cohorts.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.lenguages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
  })
    .then((newCohort) => {
      res.status(201).json(newCohort);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({message: "error"})
    });
});

// it works
app.get("/api/cohorts", (req, res)=>{
  Cohorts.find()
  .then((cohorts)=>{
    res.status(200).json(cohorts)
  })
  .catch((error)=>{
    res.status(500).json({message: "error"})
  })
})

//it works
app.get("/api/cohorts/:cohortId", (req, res)=>{
  const cohortId = req.params.cohortId
  Cohorts.findById(cohortId)
  .then((cohorts)=>{
    res.status(200).json(cohorts)
  })
  .catch((error)=>{
    res.status(500).json({message: "error"})
  })
})
// it works
app.put("/api/cohorts/:cohortId", (req, res)=>{
    Cohorts.findByIdAndUpdate(req.params.id, req.body,{new: true})
    .then((cohortId)=>{
        res.status(200).json(cohortId)
    })
    .catch((error)=>{
        res.status(500).json({message: "error"})
    })
})

// it works
app.delete("/api/students/:cohortId", (req, res)=>{
    Cohorts.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send()
    })
    .catch((error)=>{
        res.status(500).json({message: "error"})
    })
})
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
