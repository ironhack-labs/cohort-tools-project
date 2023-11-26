require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");
const Student = require("./models/Students.model")
const Cohort = require("./models/Cohorts.model")
const User = require("./models/User.model")
const {isAuthenticated} = require('./middleware/jwt.middleware')
const authRoutes = require("./routes/auth.routes")

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
    origin: ['http://localhost:5173'],
  })
);

app.use("/auth", authRoutes)

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

app.get("/api/students", (req, res) => {
  Student.find({})
  .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

app.post("/api/students", (req, res)=>{
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects 
  }).then((createdStudent)=>{
    res.status(201).json(createdStudent)
  }).catch(()=>{res.status(500).json({message:"Error Creating Student"})})
})

app.get("/api/students/cohort/:id", (req, res)=>{
  const cohortId = req.params.id;
  Student.find({cohort: cohortId})
  .populate("cohort")
  .then((students)=>res.status(200).send(students))
  .catch(()=>{res.status(500).send({message: "error Cohort Id"})})
})

app.get("/api/students/:id", (req, res)=>{
  const id = req.params.id
  Student.findById(id)
  .populate("cohort")
  .then((students)=>{
    res.status(200).send({message: "Student doesnt exists"});
}).catch(()=>{res.status(500).json({message: "error Student Id"})})
})

app.put("/api/students/:studentId", (req, res)=>{
  Student.findByIdAndUpdate(req.params.studentId, req.body, {new: true}).then((updatedStudent)=>{
      res.status(200).json(updatedStudent)
  }).catch(()=>{
      res.status(500).json({message: "Error updating Student"})
  })
})

app.delete("/api/students/:studentId", (req, res)=>{
  Student.findByIdAndDelete(req.params.studentId).then(()=>{
      res.status(204).send({message: "Student deleted"});
  }).catch(()=>{
      res.status(500).json({message: "Error deleting Student"})
  })
})

app.get("/api/cohorts", (req, res) => {
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

app.post("/api/cohorts", (req, res)=>{
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format, 
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  }).then((createdcohort)=>{
    res.status(201).json(createdcohort)
  }).catch(()=>{res.status(500).json({message:"Error Creating Cohort"})})
})

app.get("/api/cohorts/:id", (req, res)=>{
  const id = req.params.id
  Cohort.findById(id).then((cohort)=>{
    res.status(200).json(cohort);
}).catch(()=>{res.status(500).json({message: "error Cohort Id"})})
})

app.put("/api/cohorts/:cohortId", (req, res)=>{
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {new: true}).then((updatedCohort)=>{
      res.status(200).json(updatedCohort)
  }).catch(()=>{
      res.status(500).json({message: "Error updating Cohort"})
  })
})

app.delete("/api/cohorts/:cohortId", (req, res)=>{
  Cohort.findByIdAndDelete(req.params.cohortId).then(()=>{
      res.status(204).send({message: "Cohort deleted"});
  }).catch(()=>{
      res.status(500).json({message: "Error deleting Cohort"})
  })
})

app.get("/api/users", (req, res)=>{
User.find().then((user)=>{
  res.status(200).json(user);
}).catch(()=>{res.status(500).json({message: "error User Id"})})
})

app.get("/api/users/:id", (req, res)=>{
  const id = req.params.id
  User.findById(id).then((users)=>{
    res.status(200).json(users);
  }).catch(()=>{res.status(500).json({message: "error User Id"})})
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});