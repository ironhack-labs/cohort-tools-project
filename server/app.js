const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5005;
require("dotenv").config();
console.log(process.env);

// Initialize express app
const app = express();
const { isAuthenticated } = require("./middlewares");

// DATABASE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cohort-tools-dev";
mongoose
  .connect(MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => console.error("Error connecting to mongo", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Documentation route
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Import route handlers
const cohortRoutes = require("./routes/cohort.routes");
const studentRoutes = require("./routes/student.routes");
const authroutes = require("./routes/auth.routes");


app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authroutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
