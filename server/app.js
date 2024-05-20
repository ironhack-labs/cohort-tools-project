require("dotenv").config();
require("./db");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const User = require("./models/User.model");

const express = require("express");

const app = express();
require("./config")(app);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const studentRoutes = require("./routes/student.routes");
app.use("/api", studentRoutes);

const cohortRoutes = require("./routes/cohort.routes");
app.use("/api", cohortRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

//protected user route

app.get("/api/users/:userId", isAuthenticated, (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding a user" });
    });
});

require("./error-handling")(app);

module.exports = app;
