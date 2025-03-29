const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const mongoose = require("mongoose");

const {isAuthenticated} = require("./middleware/jwt.middleware");



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// const cohorts = require("./models/Cohort.model"); 
// const students = require("./models/Student.model");




// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({
  origin: [`http://localhost:5173`, "http://example.com"] // URLs allowed to enter
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// connecting to mongodb
mongoose.connect("mongodb://localhost:27017/cohort-tools-api", {
})
  .then(() => console.log("Connectec to MongoDB successfully!"))
  .catch(error => console.log("Failed to connect to MongoDB", error))



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// import the route 
app.use("/api", isAuthenticated, require("./routes/cohort.routes"));

app.use("/api", isAuthenticated, require("./routes/student.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes"));

// Create new Student

// Middleware error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Something on the server went wrong";
  res.status(status).json({error:message});
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});