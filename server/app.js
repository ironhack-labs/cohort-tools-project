const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const cohortRouter = require("./routes/cohort.routes");

app.use("/api", cohortRouter);

const studentRouter = require("./routes/students.route");

app.use("/api", studentRouter);

const userRouter = require("./routes/user.route");

app.use("/api", userRouter);

// DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api").then((x) => {
  console.log(
    `Connected to the database Database name: "${x.connections[0].name}"`
  );
});

// ERROR HANDLING
require("./error-handling/index")(app);

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
