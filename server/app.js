// ℹ️ Gets access to environment variables/settings
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");

// Imports the middleware that checks if the user is authenticated
const { isAuthenticated } = require("./middleware/jwt.middleware"); 

// INITIALIZE EXPRESS APP
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const studentRouter = require("./routes/student.routes"); // <== IMPORT
app.use("/api", studentRouter); // 

const cohortRouter = require("./routes/cohort.routes"); // <== IMPORT
app.use("/api", cohortRouter); //
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes"); // <== IMPORT
app.use("/api", isAuthenticated, userRouter); 

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;