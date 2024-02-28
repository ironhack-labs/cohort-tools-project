const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

/* const cohortsData = require("./cohorts.json");
const studentsData = require("./students.json"); */


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
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

/* app.get("/api/students",cors(corsOptions), (req, res) => {
  res.json(studentsData)
})



app.get("/api/cohorts",cors(corsOptions), (req, res) => {
  res.json(cohortsData)
}) */

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});