const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");


const { isAuthenticated } = require("./middleware/jwt.middleware");

//Import the model
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// connecting to database

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", require("./routes/auth.routes"))
app.use("/api", require("./routes/user.routes"));



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


//
// Mount routes
//
app.use("/api", require("./routes/cohort.routes.js"))
app.use("/api", require("./routes/student.routes.js"))



// Import the custom error handling middleware:
const { errorHandler, notFoundHandler } = require('./middleware/error-handling');

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});