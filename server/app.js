require("dotenv").config();
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");
const PORT = 5005;

// Initialize EXPRESS APP
const app = express();
require("./config")(app);
require("./db");

// Middleware
app.use(express.static("public"));
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Routes
// const allRoutes = require("./routes");
// app.use("/api", allRoutes);

// const projectRouter = require("./routes/project.routes");
// app.use("/api", isAuthenticated, projectRouter);

// const taskRouter = require("./routes/task.routes");
// app.use("/api", isAuthenticated, taskRouter);

// Cohort routes
const cohortsRouter = require("./routes/cohorts.routes");
app.use("/api", cohortsRouter);

// Students routes
const studentsRouter = require("./routes/students.routes");
app.use("/api", studentsRouter);

// // Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// // // User routes
const userRoutes = require("./routes/User.routes");
app.use("/api/users", isAuthenticated, userRoutes);
// // Use error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
