const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 5005;

const Student = require("./models/Students.model");
const Cohort = require("./models/Cohort.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//MONGOOSE
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
  })
);
=======
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(
	cors({
		origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
	}),
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
	res.sendFile(`${__dirname}/views/docs.html`);
});

app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("found students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error finding students ->", error);
      res.status(500).send({ error: "Lost students" });
    });
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("found cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error finding cohorts ->", error);
      res.status(500).send({ error: "Lost cohorts" });
    });
});

// START SERVER
app.listen(PORT, () => {

  console.log(`Server listening on port ${PORT}`);

});
