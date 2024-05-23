require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT;

console.log(process.env.MONGODB_URI);
console.log(process.env.SECRET);

const URI = process.env.MONGODB_URI || "mongodb://localhost/cohort-tools-api";

mongoose
  .connect(URI)
  //.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

//mongoose.connect('mongodb://127.0.0.1/')

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(
  cors({
    origins: [process.env.FRONTEND_URL],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html

app.use("/", require("./routes/index.routes"));
require("./error-handling")(app);

// Devs Team - Start working on the routes here:

// ...

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
