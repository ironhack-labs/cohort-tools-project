const connectDB = require("./config/db.config.js");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Import Routes
const cohortRoutes = require("./routes/cohorts.routes.js");
const studentRoutes = require("./routes/students.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");

const PORT = 5005;

//INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

//MIDDLEWARE Global
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Doc Route
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Use the imported rooutes

app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

// Middleware Error after routing
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// Start server connection with database
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
