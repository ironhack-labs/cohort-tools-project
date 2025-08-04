const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs")

const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5005;

const Student = require("./models/Student.model.js");
const Cohort = require("./models/Cohort.model.js");
const User = require("./models/User.model.js")
const errorHandler= require('./middleware/error-handling.js')

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(error => console.log("error connecting to database", error))


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// const cohorts = require("./cohorts.json")
// const students = require("./students.json")


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
app.use(cors())



app.use("/", require("./routes/student.routes.js"));
app.use("/", require("./routes/cohort.routes.js"));
app.use("/auth", require("./routes/auth.routes.js"))
//middleware fn to handle errors

app.use((errorHandler, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});