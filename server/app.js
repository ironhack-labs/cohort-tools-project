const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//paths not the same...why!??
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const PORT = 5005;

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


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
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// GET /api/cohorts
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

// GET /api/cohorts/:cohortId
app.get("/api/cohorts/:cohortId", (req, res) => {

  const { cohortId } = req.params; 

  Cohort.findById(cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error while getting a single cohort" });
    })
})

//POST /api/cohorts
app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
  .then((createdCohort) => {
    res.status(201).json(createdCohort);
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({ message: "Error while creating a new cohort" })
  });
});

// PUT /api/cohorts/:cohortId

app.put("/api/cohorts/:cohortId", (req, res) => {

  const { cohortId } = req.params; 

  Cohort.findByIdAndUpdate(cohortId, req.body, { new : true})
  .then((updatedCohort) => {
    res.status(200).json(updatedCohort)
  })
  .catch((error) => {
    console.error("Error while editing the book ->", error);    
    res.status(500).json({ error: "Editing book failed" })
  });
})

// DELETE /api/cohorts/:cohortId

app.delete("/api/cohorts/:cohortId", (req, res) => {

  const { cohortId }  = req.params;

  Cohort.findByIdAndDelete(cohortId)
  .then(() => {
    res.status(204).send();
  })
  .catch((error) => {
    res.status(500).json({error: "Deleted"})
  })
})


// GET /api/students

app.get("/api/students", (req, res) => {
  Student.find({})
.populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

// POST /api/students

app.post("/api/students", (req, res) => {
  
Student.create(req.body)
  .then((newStudent) => {
    res.status(201).json(newStudent)
  })
  .catch((error) => {
    res.status(500).json({error: "Error creating a new student"})
  })
})
// GET /api/students/cohort/:cohortId

app.get("/api/students/cohort/:cohortId", (req, res) => {

  const { cohortId } = req.params;

  Student.find({cohort: cohortId})
   .populate("cohort")
  .then((students) => {
      res.status(200).json(students);
    })
  .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error while getting a single student" });
    })
})


// GET /api/students/:studentsId
app.get("/api/students/:studentsId", (req, res) => {

  const { studentsId } = req.params; 

  Student.findById(studentsId)
  .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error while getting a single student" });
    })
})

// DELETE /api/cohorts/:cohortId

app.delete("/api/students/:studentsId", (req, res) => {

  const { studentsId }  = req.params;

  Student.findByIdAndDelete(studentsId)
  .then(() => {
    res.status(204).send();
  })
  .catch((error) => {
    res.status(500).json({error: "Deleted"})
  })
})

// PUT /api/students/:studentsId

app.put("/api/students/:studentsId", (req, res) => {

  const { studentsId } = req.params; 

  Student.findByIdAndUpdate(studentsId, req.body, { new : true})
  .then((updatedStudent) => {
    res.status(200).json(updatedStudent)
  })
  .catch((error) => {
    console.error("Error while editing the student ->", error);    
    res.status(500).json({ error: "Editing student failed" })
  });
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
