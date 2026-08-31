const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose")
mongoose.set('runValidators', true);
require('dotenv').config();

const cookieParser = require("cookie-parser");
const { errorHandler, notFoundHandler } = require("./middleware/error-handling")
const PORT = 5005;

const cors = require("cors");

// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173']
}))







mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Conected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err))

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// ROUTES

app.use("/", require("./routes/cohort.routes"))
app.use("/", require("./routes/student.routes"))
app.use("/", require("./routes/auth.routes"))

//  ERROR HANDLING
app.use(notFoundHandler);
app.use(errorHandler);




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
