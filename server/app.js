require('dotenv').config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./route/auth.route");
const userRoutes = require("./route/user.route");
const cohortRoutes = require("./route/cohort.route");
const studentRoutes = require("./route/student.route");
const { errorHandler, notFoundHandler } = require("./middleware/error-handling");

const PORT = 5005;
const PORT = process.env.PORT

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors({
  origin: "http://localhost:5175" // acts like a security guard that only allows access to the port 5175 . this is the localhost of my frotnend/client side.
}));
// app.use(cors());  -> this allows access to all ports aka no bodyguard

//mongoose setup 
const databaseURL = 'mongodb://localhost:27017/cohort-tools-api';
mongoose
  .connect(databaseURL)
  .then(x => {
    console.log(`Connected to Database: "${x.connections[0].name}"`);
    // START SERVER
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => console.error("Error connecting to MongoDB", err));

// ...
app.use(cors({ origin: ["http://localhost:5173"] }));
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

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

//Auth routes
app.use("/auth", authRoutes);

//User routes
app.use("/api/users", userRoutes);

//cohort routes
app.use("/api/cohorts", cohortRoutes);

//Student routes
app.use("/api/students", studentRoutes);

// Error handling middleware
app.use(errorHandler);
app.use(notFoundHandler);