const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");
const app = express();
const {errorHandler, notFoundHandler} = require("./middleware/error-handling");


const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT
/* const Student = require("./model/Student.model.js");
const Cohort = require("./model/Cohort.model.js"); 
const cohorts = require("./cohorts.json");
const students = require("./students.json"); */

app.use (express.urlencoded({ extended: false })); 


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173', 'http://example.com'],
  })
);

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
const cohortRoutes = require("./routes/cohort.routes");
app.use("/api", cohortRoutes)
const studentRoutes = require("./routes/student.routes");
app.use("/api", studentRoutes)


//  Start handling routes here
/* const allRoutes = require("./routes");
app.use("/api", allRoutes); */

 
const authRouter = require("./routes/auth.routes");       //  <== IMPORT
app.use("/auth", authRouter);                           //  <== ADD

const userRouter = require("./routes/user.routes");       //  <== IMPORT
app.use("/api", userRouter);                            //  <== ADD


// START SERVER
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;