const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

// Connection to MongoDB with mongoose
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Routes Students & Cohorts
app.use("/", require("./routes/auth.routes"))
app.use("/", require("./routes/student.routes"))
app.use("/", require("./routes/cohort.routes"))


//Middleware error handler
app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
