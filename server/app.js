const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRouter = require("./routes/students.routes");
const cohortRouter = require("./routes/cohort.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const PORT = 5005;
require("dotenv").config();
const {
  errorHandler,
  notFoundHandler,
} = require("./error-handling/error-handling");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//Database
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
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

// ROUTES - https://expressjs.com/en/starter/basic-routing.html

//ROUTES//Middlewares
app.use("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/", studentRouter);
app.use("/", cohortRouter);
app.use("/", authRouter);
app.use("/", userRouter);

//ERROR Middlewares
app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
