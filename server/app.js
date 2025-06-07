// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const Cohort = require("./models/cohort.model");
const studentRoutes = require("./routes/student.routes");
const Students = require("./models/student.model");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const User = require("./models/user.model");



const PORT = 5005;

// STATIC DATA - (you'll eventually remove this once DB is fully integrated)

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "docs.html"));
});

//Finding all students
app.get("/api/students", (req, res, next) => {
  Students.find()
    .then(response => res.json(response))
    .catch(next); 
});

//Finding students with specified cohort
app.get("/api/students/cohort/:cohortId", (req, res, next) =>{
  const {cohortId} = req.params
  //encuentra los estudiantes que tengan como cohort al cohortId.
  Students.find(({ cohort: cohortId }))  
  .then(response =>res.json(response))
  .catch(next)
})


//Finding a student by his id.
app.get("/api/students/:studentId", (req, res, next) =>{
  const {studentId} = req.params
  Students.findById(studentId)
  .then(response => res.json(response))
  .catch(next)
})

//creating new student
app.post("/api/students", (req, res, next) =>{

    const studentData = req.body; //data from studet passed through the form in the frontend
    const cohortId = studentData.cohort;// accessing to the given id of the cohort

    Cohort.findById(cohortId)
    .then((foundCohort) => {
      if (!foundCohort) {
        const error = new Error("Cohort not found");
        error.statusCode = 404;
        throw error;
      }

      // Crear al estudiante
      return Students.create(studentData);
    })
    .then((createdStudent) => {
      if (createdStudent) {
        res.status(201).json(createdStudent);
      }
    })
    .catch(next);
    

})

//updating specified student
app.put("/api/students/:studentId", (req, res, next) =>{
  const {studentId} = req.params
  const updatedStudent = req.body
  Students.findByIdAndUpdate(studentId, updatedStudent, {new: true})
  .then((updatedStudent)=> {
    if(!updatedStudent){
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(updatedStudent)
  })
  .catch(next);
})

//Delete student by Id.

app.delete("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  Students.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      if (!deletedStudent) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error
      }
      res.json({ message: "Student deleted successfully" });
    })
    .catch(next)
});


app.get("/api/cohorts", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (err) {
    const error = new Error("Error retrieving cohorts");
    error.statusCode = 500;
    next(error);
  }
});

// GET one cohort by ID
app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    res.status(200).json(cohort);
  } catch (err) {
    const error = new Error("Error retrieving cohort");
    error.statusCode = 500;
    next(error);
  }
});

// POST a new cohort
app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (err) {
    const error = new Error("Error creating cohort");
    error.statusCode = 500;
    next(error);
  }
});

// PUT update a cohort by ID
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCohort);
  } catch (err) {
    const error = new Error("Error updating cohort");
    error.statusCode = 500;
    next(error);
  }
});

// DELETE a cohort by ID
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.sendStatus(204); // No Content
  } catch (err) {
    const error = new Error("Error deleting cohort");
    error.statusCode = 500;
    next(error);
  }
});
// AUTHENTICATION ROUTES
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);


//error handler thingy 
app.use(errorHandler);


// MONGODB CONNECTION
const MONGODB_URI = "mongodb://localhost:27017/cohort-tools-api";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

   
    app.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    });
  })

  .then(() => {
    return Students.find()
    return Students.find()
  })

  .then((response) => {
    console.log(response)
    console.log("todo gucci")
  })

  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

