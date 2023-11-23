const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = 5005;
const mongoose = require('mongoose');


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const students = require('./students.json');
const cohorts = require('./cohorts.json')

// Models requires
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Mongoose Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(error => console.error("Error connecting to MongoDB", error));


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

app
.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

    // STUDENT ROUTES
  // Returns all the students - OK
app
.get("/api/students", (req, res)=>{
    Student.find({})
.populate("cohort") // OK
.then(students=>{
      console.log("Students", students);
      res.status(200).send(students)
    })
.catch((error) => {
    console.error("Error while retrieving students", error);
    res.status(500).send({ error: "Failed to retrieve students" });
  });
  });


  // Retrieves all of the students for a given cohort - OK
app
.get("/students/cohort/:cohortId", (req, res)=>{
  const cohortId = req.params.cohortId;
  Student.find({cohort: cohortId})
.populate("cohort") // OK
.then((students)=>{
    res.status(200).send(students);
  })
.catch((error)=>{console.log(error);
  res.status(500).send({error: "Failed to fetch cohort students"})})
})


  // Retrieves a specific student by id - OK 
app
.get("/students/:studentId", (req, res)=>{
  const studentId = req.params.studentId
  Student.findById(studentId)
.populate("cohort") // OK
.then((student)=>{
    console.log("Student found!", studentId);
    res.status(200).send(student);
})
.catch((error)=>{
    res.status(500).send({message: "Failed to fetch student info"});
});
});


  // Creates a new student - OK
app
.post("/students", (req, res)=>{
  Student.create({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects
  })
.then((createdStudents)=>{
  res.status(200).json(createdStudents);
})
.catch((error)=>{console.log(error);
      res.status(500).send({error: "Failed to create student card"})})
}) 


  // Updates a specific student by id - OK
app
.put("/api/students/:studentId", (req, res)=>{
  const {studentId} = req.params;
  Student.findByIdAndUpdate(studentId, req.body, {new: true})
.then((updatedStudent)=>{
  res.status(200).json(updatedStudent)
})
.catch((error)=>res.send({error: "Failed to update student Id"}))
})

  // Deletes a specific student by id
app
.delete("/api/students/:studentId", (req, res)=>{
  const {studentId} = req.params;
  Student.findByIdAndDelete(studentId)
.then(()=>{res.json({message: "Student Deleted"})
})
.catch(()=>{res.json({error: "Failed to delete student"})})
})



    // COHORT ROUTES

  // returns all the cohorts - OK
app
.get("/cohorts", (req, res)=>{
  Cohort.find({})
.then(cohorts=>{
    console.log("cohorts: ", cohorts);
    res.status(200).send(cohorts)
    })
.catch((error) => {
    console.error("Error while retrieving cohorts", error);
    res.status(500).send({ error: "Failed to retrieve cohorts" });
  });
}) 

  // Retrieves a specific cohort by id - OK
app
.get("/api/cohorts/:cohortId", (req, res)=>{
  const cohortId = req.params.cohortId
  Cohort.findById(cohortId)
.then((cohort)=>{
    console.log("Cohort found!", cohortId);
    res.status(200).send(cohort);
})
.catch((error)=>{
    res.status(500).send({message: "Failed to fetch cohort info"});
});
})


  // Creates a new cohort - OK
app
.post("/api/cohorts", (req, res)=>{
    Cohort.create({
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
  })
.then((createdCohorts)=>{
    res.status(200).send(createdCohorts);
  })
.catch((error)=>{console.log(error);
        res.status(500).send({error: "Failed to create cohort"})})

})


  // Updates a specific cohort by id - OK
app
.put("/api/cohorts/:cohortId", (req, res)=>{
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(cohortId, {
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  }, {new: true})
.then((updatedCohort)=>{
  console.log("Cohort updated");
    res.status(200).json(updatedCohort)
  })
.catch((error)=>{console.log(error);
  res.status(500).send({error: "Failed to update cohort"})})
})


  // Deletes a specific cohort by id - OK
app
.delete("/api/cohorts/:cohortId", (req, res)=>{
  const {cohortId} = req.params;
  Cohort.findByIdAndDelete(cohortId)
.then(()=>{res.json({message: "Cohort Deleted"})})
.catch(()=>{res.json({error: "Failed to delete cohort"})})
})




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});