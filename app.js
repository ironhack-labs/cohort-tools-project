process.loadEnvFile();
// Express framework for creating the server and routes
const express = require("express");
// STATIC DATA
// CREATE EXPRESS APPLICATION
const app = express();

// Morgan logs HTTP requests in the terminal
// const morgan = require("morgan");

// Helps read cookies sent by the browser
const cookieParser = require("cookie-parser");

// Mongoose allows Node.js to communicate with MongoDB
// const mongoose = require("mongoose");

// Enables communication between frontend and backend on different ports/domains
const cors = require("cors");

//* DEFINE SERVER PORT
// The backend server will run on port 5005
// const PORT = 5005;

// IMPORT DATABASE MODELS
// These models represent collections in MongoDB
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

//* MIDDLEWARE
// Research Team - Set up CORS middleware here:
const config = require("./config");
config(app);

// Enable CORS so frontend apps can access this API
// app.use(cors());

//* Connect to MongoDB database
//We import DB from its dedicated folder (db)
const connectDB = require("./db");
app.use(async (req, res, next) => {
  await connectDB();
  next();
});
// mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
// Runs if connection is successful
// .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))

// Runs if there is a database connection error
// .catch((err) => console.error("Error connecting to MongoDB", err));

// Parse incoming JSON data from requests
app.use(express.json());

// Log requests in the terminal
// app.use(morgan("dev"));

// Makes files inside the "public" folder accessible
app.use(express.static("public"));

// Parses URL-encoded form data
// Useful when data comes from HTML forms
app.use(express.urlencoded({ extended: false }));

// Allows reading cookies from requests
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
//* TEST ROUTE
// Sends the docs.html file when user visits /docs
app.get("/docs", (req, res) => {
  // __dirname = current folder location
  // res.sendFile(__dirname + "/views/docs.html");
  res.status(200).json({ message: "looking perfect already" });
});

app.get("/api/test", (req, res, next) => {
  console.log(req.body); // when we receive a lot of data, usually for document creation or updates
  console.log(req.query); // when we are trying to search or filter data
  console.log(req.params); // when we are passings ids, usually for getting the details of a specific document, updating or deleting a specific document

  res.status(200).json({ message: "perfectly working fine" });
});

app.get("/", (req, res, next) => {
  res.json("Testing");
});

// GET ALL COHORTS
// Route: GET /cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.find({ awardsWon: { $gte: 200 } }).select({
      name: 1,
      awardsWon: 1,
    });
    console.log(response);

    if (response.length === 0) {
      res.status(204).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
  }
});

// this is to create a new student
app.post("/cohorts", async (req, res) => {
  try {
    const newCohort = {
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    const response = await Cohort.create(newCohort);
    res.status(200).json(response);
    console.log("new cohort created");
  } catch (error) {
    console.log(error);
  }
});

// this is to update the student
app.patch("/cohorts/:cohortId", async (req, res) => {
  try {
    const updatedCohort = {
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      updatedCohort,
      { new: true },
    );
    res.status(200).json(response);
    console.log("new cohort updated");
  } catch (error) {
    console.log(error);
  }
});

// this is to delete a student
app.delete("/cohorts/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findByIdAndDelete(req.params.cohortId);
    res.sendStatus(200);
    console.log("cohort deleted");
  } catch (error) {
    console.log(error);
  }
});

// GET ALL STUDENTS
// Route: GET /students
app.get("/", (req, res) => {
  try {
    res.json({ message: "all is good you are connecting to " });
  } catch (err) {
    console.log(error);
  }
});
app.get("/students", async (req, res) => {
  try {
    const response = await Student.find();
    console.log("Retrieved students ->", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

// this is to create a new student
app.post("/students", async (req, res) => {
  try {
    const newStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      program: req.body.proram,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
    };
    const response = await Student.create(newStudent);
    res.status(200).json(response);
    console.log("new student created");
  } catch (error) {
    console.log(error);
  }
});

// this is to update the student
app.patch("/students/:studentId", async (req, res) => {
  try {
    const updatedStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      program: req.body.proram,
      background: req.body.background,
      image: req.body.image,
    };
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      updatedStudent,
      { new: true },
    );
    res.status(200).json(response);
    console.log("new student updated");
  } catch (error) {
    console.log(error);
  }
});

// this is to delete a student
app.delete("/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.studentId);
    res.sendStatus(200);
    console.log("student deleted");
  } catch (error) {
    console.log(error);
  }
});

const indexRouter = require("./routes/index.routes");
app.use("/api", indexRouter);
// server listen & PORT

// Start server
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
