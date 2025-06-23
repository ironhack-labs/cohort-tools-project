require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose')

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api") 
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const students = require("./models/students.model");
const cohorts = require ("./models/cohorts.model");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
require("./config")(app);

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
// app.use(cors())
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

//Retrieves all of the students for a given cohort



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);



module.exports = app;

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});