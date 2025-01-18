const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const { errorHandler, notFoundHandler } = require("./middleware/error-handling");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const { isAuthenticated } = require("./middleware/auth.middleware");
require("dotenv").config();

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohortsJSON = require("./cohorts.json");
const studentsJSON = require("./students.json");
const FRONTEND_URL = process.env.ORIGIN || `http://localhost:5173`;

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//install mongoose
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-project")
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to Mongo", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);
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

//student routes
const studentRoutes = require("./routes/student.routes");
app.use(studentRoutes);

//cohort routes
const cohortRoutes = require("./routes/cohort.routes");
app.use(cohortRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes);

//Check the custom error handler
// const getRejectedPromise = () => {
//   // We are intentionally rejecting the promise to simulate a failed database operation.
//   return Promise.reject("Failed on purpose.");
// };
// app.get("/route-to-test-error-handling", (req, res, next) => {
//   getRejectedPromise()
//     .then()
//     .catch((err) => {
//       console.log(err);
//       next(err);
//     });
// });

//add custom error handler after all routes
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
