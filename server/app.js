require('dotenv').config()

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = 5005;

// const MONGO_URI =
  // process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cohorts";

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const { isAuthenticated } = require("../server/middleware");
const User = require("../server/models/User.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(
  cors({
    origin: ['http://localhost:5173'], // Add the URLs of allowed origins to this array
  })
);

// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.get("/api/users/:id", isAuthenticated, (req, res, next) => {
  console.log("req.params.id", req.params.id);
  User.findById(req.params.id).then((User) => 
    res.json(User)).catch((err) => {
    res.status(500).json({ message: "Error while getting user details" });
  });
})

const studentsRoutes = require("./routes/student.routes");
app.use("/api", studentsRoutes);

const cohortsRoutes = require("./routes/cohort.routes");
app.use("/api", cohortsRoutes);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});