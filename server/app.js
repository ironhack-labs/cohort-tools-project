require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = 5005;
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.model")
const {isAuthenticated} = require("./middleware/jwtmiddleware")
// Define the number of encryptions of the password. 10 is usually a good number
const saltRounds = 10;


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

// --------------------------------- // STUDENT ROUTES // -------------------------------- //

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
.get("/students/cohort/:cohortId", (req, res, next)=>{
  const cohortId = req.params.cohortId;
  Student.find({cohort: cohortId})
.populate("cohort") // OK
.then((students)=>{
    res.status(200).send(students);
  })
.catch((error)=>{console.log(error);
  res.status(500).send({error: "Failed to fetch cohort students"})})
  next(error)
})

// Retrieves a specific student by id - OK 
app
.get("/students/:studentId", (req, res, next)=>{
  const studentId = req.params.studentId
  Student.findById(studentId)
.populate("cohort") // OK
.then((student)=>{
    console.log("Student found!", studentId);
    res.status(200).send(student);
})
.catch((error)=>{
    res.status(500).send({message: "Failed to fetch student info"});
    next(error)
});
});

// Creates a new student - OK
app
.post("/students", (req, res, next)=>{
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
      next(error)
}) 

// Updates a specific student by id - OK
app
.put("/api/students/:studentId", (req, res, next)=>{
  const {studentId} = req.params;
  Student.findByIdAndUpdate(studentId, req.body, {new: true})
.then((updatedStudent)=>{
  res.status(200).json(updatedStudent)
})
.catch((error)=>res.send({error: "Failed to update student Id"}))
})

// Deletes a specific student by id - OK
app
.delete("/api/students/:studentId", (req, res)=>{
  const {studentId} = req.params;
  Student.findByIdAndDelete(studentId)
.then(()=>{res.json({message: "Student Deleted"})
})
.catch(()=>{res.json({error: "Failed to delete student"})})
next(error)
})



// ------------------------- // COHORT ROUTES // ----------------------------- //

// returns all the cohorts - OK
app
.get("/cohorts", (req, res, next)=>{
  Cohort.find({})
.then(cohorts=>{
    console.log("cohorts: ", cohorts);
    res.status(200).send(cohorts)
    })
.catch((error) => {
    console.error("Error while retrieving cohorts", error);
    res.status(500).send({ error: "Failed to retrieve cohorts" });
    next(error)
  });
}) 

// Retrieves a specific cohort by id - OK
app
.get("/api/cohorts/:cohortId", (req, res, next)=>{
  const cohortId = req.params.cohortId
  Cohort.findById(cohortId)
.then((cohort)=>{
    console.log("Cohort found!", cohortId);
    res.status(200).send(cohort);
})
.catch((error)=>{
    res.status(500).send({message: "Failed to fetch cohort info"});
    next(error)
});
})

// Creates a new cohort - OK
app
.post("/api/cohorts", (req, res, next)=>{
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
        next(error)
})

// Updates a specific cohort by id - OK
app
.put("/api/cohorts/:cohortId", (req, res, next)=>{
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
  next(error)
})

// Deletes a specific cohort by id - OK
app
.delete("/api/cohorts/:cohortId", (req, res, next)=>{
  const {cohortId} = req.params;
  Cohort.findByIdAndDelete(cohortId)
.then(()=>{res.json({message: "Cohort Deleted"})})
.catch(()=>{res.json({error: "Failed to delete cohort"})})
next(error)
})

// ------------------------ // USER AUTHENTICATION // ------------------------------- //

// POST -> Creates a new user - OK
app
.post("/auth/signup", (req, res)=>{
    const {email, password, name} = req.body;

    if(email === "" || password === "" || name === ""){
        res.status(400).json({message: "Please provide email, password and name"})
        return; // return will stop the code
    }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if(!emailRegex.test(email)){
       res.status(400).json({message: "Please provide a valid email"})
       return;
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passwordRegex.test(password)){
        res.status(400).json({message: "Password must have at least 6 characters, one number, one lowercase and one uppercase letter"})
        return;
    }

// What if the name or password already exists on the database?
// We try to find the user with that email:
    User.findOne({email})
// Then if the user is found:
.then((foundUser)=>{
        if(foundUser){
            res.status(400).json({message: "User already exists"})
            return;
        }
// If the user is not found:
// Encrypt a Password - salt is like something we add to encrypt the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return User.create({email, password: hashedPassword, name});
//The, after the user is created (as a promise), we use it:
    })
.then((createdUser)=>{
        const {email, name, _id} = createdUser;
        const user = {email, name, _id};
        res.status(200).json({user: user});
    })
.catch((error)=>{
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    })
});

// POST "/auth/login" - Verifies email and password and returns a JWT - OK
app
.post("/auth/login", (req, res)=>{
  const {email, password} = req.body;
  // What if email and password were left in blank?
  if(email === "" || password === ""){
      res.status(400).json({message: "Please provide an email and password"});
      return;
  }
  User
.findOne({email})
.then((foundUser)=>{
// What if the user was not found?
  if(!foundUser){
      res.status(400).json({message: "User not found"});
      return;
  }
// What if the password is correct?
  const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
  if(passwordCorrect){
      const {_id, email, name} = foundUser;
      const payload = {_id, email, name};
      const authToken = jwt.sign(
          payload, process.env.TOKEN_SECRET, {algorithm: "HS256", expiresIn: "6h"}
      )
      res.status(200).json({authToken: authToken});
  }
// What if the password is not correct?
  else{
      res.status(400).json({message: "Password not found"})
  }
})
.catch((error)=> res.status(500).json({message: "some error"}))
});

// GET "/auth/verify" -> Used to verify JWT
app      // isAuthenticated, in the middle of the rounte, as it is a middlware
.get("/auth/verify", isAuthenticated, (req, res)=>{
    res.status(200).json(req.payload);
})

app.get('/api/user/:id', (req, res)=>{
  const id = req.params.id
User.findById(id).then((user)=>{
  res.status(200).json(user);
}).catch((error)=>{res.status(500).json({message: "error User Id"})})
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
