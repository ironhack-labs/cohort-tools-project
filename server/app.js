const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const router = require('express').Router();
require('dotenv').config()
const { isAuthenticated } = require("./middleware/jwt.middleware");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const students = require("./students.json");
const cohorts = require("./cohorts.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(express.urlencoded({ extended: false }));



mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const { errorHandler, notFoundHandler } = require('./middleware/errorHandle');
 

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
const cohortRoutes = require("./routes/cohort.routes");
app.use("/api", cohortRoutes)

const studentRoutes = require("./routes/student.routes");
app.use("/api", studentRoutes)

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);  

const userRouter = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRouter);



// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
