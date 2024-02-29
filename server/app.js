const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("../server/cohorts.json");
const students = require("../server/students.json");
const cors = require("cors");
const mongoose = require("mongoose");
const student = require("./models/Student.model");
const cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");
const studentRouter = require("./routes/student.routes");
const cohortRouter = require("./routes/cohort.routes");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// app.js

// ...

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ...

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", studentRouter);
app.use("/", cohortRouter);

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const errorHandler = require("./middleware/error-handling");
const notFoundHandler = require("./middleware/error-handling");

app.use(errorHandler, notFoundHandler);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
