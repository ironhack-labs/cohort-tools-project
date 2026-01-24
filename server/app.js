require("dotenv").config();
const cohortRoutes = require("./routes/cohort.routes");
const studentRoutes = require("./routes/student.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);

// STATIC DATA
//const cohorts = require("./data/cohorts.json");
//const students = require("./data/students.json");
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);


mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



