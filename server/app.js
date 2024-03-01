const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const {errorHandler, notFoundHandler} = require ("./middleware/error-handling"); // <-- importing custom error handler
const { isAuthenticated} = require('./middleware/jwt.middleware')


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

/* const cohortsData = require("./cohorts.json");
const studentsData = require("./students.json"); */


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Here we set up the "cors"
/* const corsOptions = {
  origin: 'http://localhost:5005',
  optionsSuccessStatus: 200 
}
 */
// Here we are connecting to our database using Mongoose. 
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

const studentsRoutes = require("./routes/students.routes")
app.use("/api", studentsRoutes)

const cohortsRoutes = require("./routes/cohort.routes");
app.use("/api", cohortsRoutes)

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

/* app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'You accessed a protected route!' });
}); */

/* app.get("/api/students",cors(corsOptions), (req, res) => {
  res.json(studentsData)
})



app.get("/api/cohorts",cors(corsOptions), (req, res) => {
  res.json(cohortsData)
}) */

// 01-03-2024  import the auth routes according to the instructions

//================================================================

// HERE WE EMULATE THE PROTECTION WITH ISAUTHENTICATED
/**
 * 
const projectRouter = require("./routes/project.routes");
app.use("/api", isAuthenticated, projectRouter);            // <== UPDATE
 
const taskRouter = require("./routes/task.routes");
app.use("/api", isAuthenticated, taskRouter);  

* 
*/

const authRouter = require("./routes/auth.routes")
app.use("/auth", authRouter);

// MIDDLEWARE set up
app.use(errorHandler);
app.use(notFoundHandler);



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});