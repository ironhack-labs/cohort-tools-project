require("dotenv/config");


const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors")
const mongoose = require("mongoose")
const { errorHandler, notFoundHandler } = require("./error-handling/index.js")


mongoose
.connect('mongodb://127.0.0.1:27017/cohorts-tools-api')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohorts = require("./cohorts.json")
const students = require("./students.json")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
app.use(cors( {
  origin: ["http://localhost:5173"]
} ));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorHandler);


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const studentsRouter = require('./routes/students.routes.js')
app.use("/api/students", studentsRouter)

const cohortsRouter = require('./routes/cohorts.routes.js')
app.use("/api/cohorts", cohortsRouter)

const authRouter = require("./routes/auth.routes.js");
app.use("/auth", authRouter)

const usersRouter = require("./routes/user.routes.js");
app.use("/api/users", usersRouter);

//Not Found Error Handler at the end of all routes!
app.use(notFoundHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});