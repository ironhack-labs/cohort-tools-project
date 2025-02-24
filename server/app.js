require("dotenv").config();

require("./db");

const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const app = express();

require("./config")(app);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const studentRoutes = require("./routes/student.routes");
app.use("/api/students", isAuthenticated, studentRoutes);

const cohortRoutes = require("./routes/cohort.routes");
app.use("/api/cohorts", isAuthenticated, cohortRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/users", isAuthenticated, userRoutes);

module.exports = app;
