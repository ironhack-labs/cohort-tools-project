const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const studentRouter = require("./routes/student.routes.js");
const cohortRouter = require("./routes/cohorts.routes.js");
const userRouter = require("./routes/user.routes.js");
const connectDb = require("./config/mongoose.config.js");

// app.use(cors({ origin: `http://127.0.0.1:${PORT}` }));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/students", studentRouter);
app.use("/cohorts", cohortRouter);
app.use("/users", userRouter);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/cohorts", (req, res) => {
  res.sendFile(__dirname + "/cohorts.json");
});

app.get("/students", (req, res) => {
  res.sendFile(__dirname + "/students.json");
});

// START SERVER
connectDb();
app.listen(process.env.PORT, () => {
  console.log("Server up and running on port: " + process.env.PORT);
});
