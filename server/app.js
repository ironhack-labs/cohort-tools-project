const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cohortData = require("./cohorts.json");
const studentData = require("./students.json");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then((x) => console.log("Connect to the database", x.connections[0].name))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const studentsRoutes = require("./routes/students.routes");
app.use(studentsRoutes);

const cohortsRoutes = require("./routes/cohorts.routes");
app.use(cohortsRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userRoute = require("./routes/user.route");
app.use("/api/user/:id", userRoute)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
