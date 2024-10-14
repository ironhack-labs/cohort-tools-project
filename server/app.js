require("dotenv").config()

require("./db")

const express = require ("express")


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const configs = require("./config")
configs(app)


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// const Student = require("./models/student.model")
// const Cohort = require("./models/cohort.model")

// ALL ROUTES
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)


// ERROR HANDLING
const errorHandling = require("./error-handlers")
errorHandling(app)


const PORT = process.env.PORT || 5005;

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});