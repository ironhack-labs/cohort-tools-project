require("dotenv").config()
const express = require("express");
// require("dotenv").config();


require("./db")



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// const importedStudents = require("./students.json")

//console.log(importedStudents)
// const importedCohorts = require("./cohorts.json")

//console.log(importedCohorts)

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

const config = require("./config")
config(app)

// MIDDLEWARE
// Research Team - Set up CORS middleware here:


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// app.get("/docs", (req, res, next) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });
// app.get("/api/students", (req, res) => {
//   res.json(importedStudents)
// })

const router = require("./routes/index.routes")
app.use("/api", router)

// Error handling

const errorHandling = require("./errors")
errorHandling(app)

// START SERVER and PORT

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
