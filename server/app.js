const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// const cohorts = require("./cohorts.json")
// const students = require("./students.json")
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");
const User = require("./models/User.model")
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");


mongoose
.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error("Error connecting to mongo", err));



const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(cors({ origin: ["http://localhost:5173"] }));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
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

// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });

// app.get("/api/students", (req, res) => {
//   res.json(students);
// });
app.use("/", require("./routes/cohort.routes"));
app.use("/", require("./routes/student.routes"));
app.use("/", require("./routes/user.routes"));
app.use("/auth", require("./routes/auth.routes"));


app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

