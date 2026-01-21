require("dotenv").config(); // Load environment variables from .env file

const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const PORT = process.env.PORT || 5005;

// IMPORT ROUTES
const authRoutes = require("./routes/auth.routes");
const cohortRoutes = require("./routes/cohort.routes");
const studentRoutes = require("./routes/student.routes");
const userRoutes = require("./routes/user.routes");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// DATABASE CONNECTION
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Docs route
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Use route handlers
app.use("/auth", authRoutes);
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/user", userRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
