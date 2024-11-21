const cors = require("cors")
const Student = require("./modules/Student")
const Cohort = require("./modules/Cohort")

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose
.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
.catch(err => console.error("Error connecting to MongoDB", err));

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ['http://localhost:5005'], 
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


app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({})
    .populate("cohort");
    console.log("Retrieved students ->", students);
        res.json(students);
  } catch (error) {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});


app.post("/api/students", async (req,res) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages, 
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
      cohort: req.body.cohort  
    })
    res.json(newStudent)
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/students/cohort/:cohortId", async (req,res) => {
  const {cohortId} = req.params
  try {
    const students = await Student.find({cohort:cohortId})
    .populate("cohort")
    res.send(students)
    if (cohortId.length === 0) {
      return ("No cohort mach the description")
    }
  } catch (error) {
    console.log(error)
  }
})


app.get("/api/students/:studentId", async (req,res) => {
  try {
    const estudiante = await Student.findById(req.params.studentId)
    .populate("cohort")
    res.send(estudiante)
  } catch (error) {
    console.log(error)
  }
})

app.put("/api/students/:studentId", async (req,res) => {
  try {
    const response = await Student.findByIdAndUpdate(req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages, 
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
      cohort: req.body.cohort  
    })
    res.json("response:", response)
  } catch (error) {
    console.log(error)
  }
})

app.delete("/api/students/:studentId", async (req,res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.json("student deleted")
  } catch (error) {
    console.log(error)
  }
})



app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find({});
    console.log("Retrieved cohorts ->", cohorts);
    res.json(cohorts);
  } catch (error) {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({ error: "Failed to retrieve cohorts" });
  }
});

//crear un cohort

app.post("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.create({
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });

    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});

//leer todos los cohort

app.get("/api/cohorts", async (req, res) => {
  try {
    const allCohort = await Cohort.find();

    res.json(allCohort);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});

// leer un cohorts

app.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.id);
    res.json(cohort);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});

// actualizar un cohort
app.put("/api/cohorts/:id", async (req, res) => {
  try {
    const updateCohorts = await Cohort.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updateCohorts);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});

//eliminar un cohort

app.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const response = await Cohort.findByIdAndDelete(req.params.id);

    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
});




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});