// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const path = require("path");

const express = require("express");
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
require("./config")(app);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/api/users", usersRoutes);

const cohortsRoutes = require("./routes/cohorts.routes");
app.use("/api/cohorts", cohortsRoutes);

const studentsRoutes = require("./routes/students.routes");
app.use("/api/students", studentsRoutes);

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "docs.html"));
});

require("./error-handling")(app);

module.exports = app;
