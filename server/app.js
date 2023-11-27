const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Cohort = require('./models/Cohort');
const Student = require('./models/Student');
const User = require('./models/User')

const {isAuthenticated} = require("../server/middleware/jwt.middleware");

const cors = require("cors");
const { get } = require("http");


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Student Routes

/* 1st POST /api/students - Creates a new student */

app.post("/api/students", (req,res,next)=>{
  Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body. email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: req.body.projects,
  })
  .then((createdStudent)=>{
      console.log("Student was created", createdStudent);
      res.status(201).send(createdStudent);
  })
  .catch((error)=>{
      console.log(error);
      res.status(500).send({error: "Failed to create a student"});
      next(error)
  });
});

/* 2nd GET /api/students - Retrieves all of the students in the database collection */

app.get('/api/students',(req,res,next)=>{

  Student.find()
  .populate('cohort')
    .then((students)=>{
        console.log("Retrieved students", students);
        res.status(200).send(students);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: "Failed to get students"});
        next(error)
    })
});

/* 3rd GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort */

app.get ('/api/students/cohort/:cohortId',(req,res,next)=>{
  const {cohortId} = req.params;

  Student.find({ cohort: { $in: [cohortId] } })
  .populate('cohort')
    .then((students)=>{
        console.log("Retrieved students", students);
        res.status(200).send(students);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: "Failed to get students"});
        next(error)
    })
})

/* 4th GET /api/students/:studentId - Retrieves a specific student by id */

app.get("/api/students/:studentId", (req,res,next)=>{
  const {studentId} = req.params;

  Student.findById(studentId)
  .populate('cohort')
  .then((student)=>{
      console.log("Retrieved student", student);
      res.status(200).send(student);
  })
  .catch((error)=>{
      console.log(error);
      res.status(500).send({error: "Failed to get student"});
      next(error)
  })
});

/* 5th PUT /api/students/:studentId - Updates a specific student by id */

app.put('/api/students/:studentId',(req,res,next)=>{
  const {studentId} = req.params;

  Student.findByIdAndUpdate(studentId, req.body)
  .then((student)=>{
    console.log("Updated student", student);
    res.status(200).send(student);
})
  .catch((error)=>{
    console.log(error);
    res.status(500).send({error: "Failed to update student"});
    next(error)
  })
})

/* 6th DELETE /api/students/:studentId - Deletes a specific student by id */

app.delete('/api/students/:studentId',(req,res,next)=>{
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId)
  .then((deletedStudent)=>{
    console.log("Deleted Student", deletedStudent);
    res.status(200).send(deletedStudent);
  })
  .catch((error)=>{
    console.log(error);
    res.status(500).send({error: "Failed to delete student"});
    next(error)
  })

})

//Cohort Routes
/* Creates a new cohort*/
app.post('/api/cohorts', (req, res, next)=>{
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
  }
  .then ((response)=> res.json(response))
  .catch((error)=> next(error))
  )
})
/* GET /api/cohorts - Retrieves all of the cohorts in the database collection
 */
app.get('/api/cohorts', (req, res, next)=>{
  Cohort.find()
  .then ((response)=>res.json(response))
  .catch((error)=>next(error))
})
/* GET /api/cohorts/:cohortId - Retrieves a specific cohort by id */
app.get('/api/cohorts/:cohortId', (req, res, next)=>{
  const {cohortId} = req.params
  Cohort.findById(cohortId)
  .then((cohort)=>res.json(cohort))
  .catch((error)=>next(error))
})
/* PUT /api/cohorts/:cohortId - Updates a specific cohort by id*/
  app.put("/api/cohorts/:cohortId", (req, res, next)=>{
  const {cohortId} = req.params
  const {cohortSlug, cohortName, program, format, campus,
  startDate, endDate, inProgress, leadTeacher, programManager, totalHours} = req.body
  Cohort.findByIdAndUpdate(cohortId,
    {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, leadTeacher, programManager, totalHours},
    {new: true})
    .then(()=>{
      res.json({message: "Cohort Updated"})
    })
    .catch((error)=>{
      res.json({message: "Cohort not updated (failed)"})
      next(error)
    })
})
/* DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
 */
app.delete("/api/cohorts/:cohortId", (req, res, next)=>{
  const {cohortId} = req.params
  Cohort.findByIdAndDelete(cohortId)
  .then(()=>{
    res.json({message: "Cohort Deleted"})
  })
  .catch((error)=>{
    res.json({message: "Cohort Delete Failed"});
    next(error);
  })
})

const {errorHandler,notFoundHandler} = require("./middleware/error-handling");
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.use(errorHandler)
app.use(notFoundHandler)


// MONGOOSE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));



  // START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

