const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require("./error-handling");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User.model");
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")

const PORT = 5005;
const saltRounds = 10;
require("dotenv").config();

const { isAuthenticated } = require("./middleware/jwt.middleware");


// Setup mongoose connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


// STATIC DATA
const cohorts = require("./cohorts.json");
const students = require("./students.json")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());




// ROUTES - https://expressjs.com/en/starter/basic-routing.html

// ------ Api endpoints for Cohorts ------ 
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieve cohorts: ", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      next(error);
    })
})

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      next(error);
    })
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
    .then((createdCohort) => {
      res.status(200).json(createdCohort)
    })
    .catch((error) => {
      next(error);
    })

})

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      next(error);
    })
})

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    })
})



// ------ Api endpoints for Students ------ 
app.get("/api/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieve students " + students);
      res.status(200).json(students)
    })
    .catch((error) => {
      next(error);
    })
})

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((cohortStudents) => {
      console.log("Retrieve cohort students " + cohortStudents);
      res.status(200).json(cohortStudents)
    })
    .catch((error) => {
      next(error);
    })
})

app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      next(error);
    })
});

app.post("/api/students", (req, res) => {
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
    projects: req.body.projects,
    cohort: req.body.cohortId,
  })
    .then((createdStudent) => {
      res.status(200).json(createdStudent)
    })
    .catch((error) => {
      next(error);
    })
})

app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      next(error);
    })
})

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    })
})

// user authentication


// POST /auth/signup  - Creates a new user in the database
app.post('/signup', (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if the email or password or name is provided as an empty string 
  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }


  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then` 
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id } = createdUser;
    
      // Create a new object that doesn't expose the password
      const user = { email, name, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
    });
});


// POST  /auth/login - Verifies email and password and returns a JWT
app.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string 
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
    
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;
        
        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        // Create and sign the token
        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

// 
app.get("/api/user/:id",isAuthenticated, (req, res, next) => {
  User.findById(req.param.id)
  .then(user => {
    res.status(200).json(user)
  }) 
  .catch(error => {
    next(error)
  }) 
})


// Own custom error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});