const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");


const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const User = require("./models/User.model");

require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const cohorts = require("./cohorts.json");
const students = require("./students.json");

const { authentication } = require("./middleware/authentication");

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

// app.use(helmet());

// overriding "font-src" and "style-src" while
// maintaining the other default values
// helmet.contentSecurityPolicy({
//   useDefaults: false,
//   directives: {
//     "default-src": ["'self'", "https://cdnjs.cloudflare.com"]
//   },
// })

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// COHORT ROUTES
// GET - RETRIEVE ALL COHORTS
app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    //.catch((error) => {
    // console.error("Error while retrieving cohorts ->", error);
    //  res.status(500).json({ error: "Failed to retrieve cohorts" });
    .catch(error => {
      next(error);
    });
});

// POST - CREATE NEW COHORT
app.post(`/api/cohorts`, (req, res, next) => {
  Cohort.create(req.body)
    .then((cohort) => res.status(200).json(cohort))
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json({ message: `Unable to create cohort, ${err}` });
    .catch(error => {
      next(error)
    });
});

// GET - RETRIEVE COHORT BY ID
app.get(`/api/cohorts/:cohortId`, (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => res.status(200).json(cohort))
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json({ message: `Unable to retrieve cohort, ${err}` });
    .catch(error => {
      next(error)
    });
});

// PUT - UPDATE EXISTING COHORT BY ID
app.put(`/api/cohorts/:cohortId`, (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => res.status(200).json(updatedCohort))
    //.catch((err) => {
    //  console.log(err);
    //  res.status(500).json({ message: `Unable to update cohort, ${err}` });
    .catch(error => {
      next(error)
    });
});

// DELETE - DELETE EXISTING COHORT BY ID
app.delete(`/api/cohorts/:cohortId`, (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => res.status(204).send())
    // .catch((err) => {
    // console.log(err);
    //   res.status(500).json({ message: `Unable to delete cohort, ${err}` });
    .catch(error => {
      next(error)
    });
});

// STUDENT ROUTES

// CREATE A NEW STUDENT
app.post("/api/students", (req, res, next) => {
  Student.create(req.body)
    .then((newStudent) => {
      res.status(200).json(newStudent);
    })
    // .catch((e) => {
    //   res.status(500).json({ message: `Failed to add a new student, ${e}` });
    .catch(error => {
      next(error)
    });
});

// GETS ALL STUDENTS
app.get("/api/students", (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      //console.log("Retrieved students ->", students);
      res.json(students);
    })
    // .catch((error) => {
    //console.error("Error while retrieving students ->", error);
    //   res.status(500).json({ message: "Failed to retrieve students" });
    .catch(error => {
      next(error)
    });
});

//RETIEVES ALL STUDENTS FROM A COHORT
app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((studentsFromCohort) => {
      res.status(200).json(studentsFromCohort);
    })
    ////.catch((message) => {
    //console.error("Error while retrieving student details ->", message);
    // res.status(500).json({ message: "Failed to retrieve student details" });
    .catch(error => {
      next(error)
    });
});

// GETS STUDENT BY ID
app.get("/api/students/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((studentDetails) => {
      // console.log("Retrieved student detailss ->", studentDetails);
      console.log("Display student detials ->", studentDetails);
      res.status(200).json(studentDetails);
    })
    // .catch((e) => {
    //console.error("Error while retrieving student details ->", e);
    //  res.status(500).json({ message: "Failed to retrieve student details" });
    .catch(error => {
      next(error)
    });
});

// Update student by ID
app.put("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
  then((updatedStudent) => {
    res.status(200).json(updatedStudent);
  })
    //.catch((e) => {
    //console.error("Error while updating student details ->", e);
    //  res.status(500).json({ message: "Failed to update student details" });
    .catch(error => {
      next(error)
    });
});

// DELETE STUDENT BY ID
app.delete("/api/students/:studentId", (req, res, next) => {
  Student.delete(req.params.studentId)
    .then(() => {
      res.status(204).send();
      window.location.replace("/api/students");
    })
    // .catch((e) => {
    //console.error("Error while deleting student details ->", e);
    //  res.status(500).json({ message: "Failed to delete student details" });
    .catch(error => {
      next(error)
    });
});

// GET USER BY ID /api/users/:id

app.get(`/api/users/:id`, authentication, (req, res, next) => {

  const id = req.params.id;

  User.findById(id)
    .then(user => {
      const {name, email} = user;
      res.status(200).json({name: name, email: email})
    })
    .catch(error => {
      next(error)
    });
})

app.use("/auth", require("./routes/auth.routes"));


const { errorHandler, notFoundHandler } = require("./middleware/error-handling");

app.use(errorHandler);
app.use(notFoundHandler);



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
