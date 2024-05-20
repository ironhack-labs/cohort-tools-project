require("dotenv").config();
require("./db");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const express = require("express");
const app = express();

require("./config")(app);

const allRoutes = require("./routes/index");
app.use("/", allRoutes);

const cohortRoutes = require("./routes/cohort.routes");
app.use("/api", cohortRoutes);

const studentRoutes = require("./routes/student.routes");
app.use("/api", studentRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes);

module.exports = app;
