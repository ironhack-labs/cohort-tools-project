require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");
const PORT = process.env.PORT || 5005;

// Connect to MongoDB with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Import and use routes
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/students.routes"));
app.use("/", require("./routes/cohort.routes"));

// Documentation route
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
