const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const mongoose = require("mongoose");
const Cohort = require("./models/cohortModel.js");
const Student = require("./models/studentsModel.js");
const cohortRoute = require("./routes/cohortRoutes.js");
const studentRoute = require("./routes/studentRoutes.js");
const userRoute = require("./routes/user.routes.js");
const {errorHandler, notFoundHandler} = require("./middleware/error-handling.js");
const authRouter = require("./routes/auth.routes.js");
const {isAuthenticated} = require("./middleware/jwt.middleware.js")

mongoose
  .connect("mongodb+srv://sami:Test123@cluster0.wrha9qb.mongodb.net/")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// CORS MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/api/cohorts", isAuthenticated, cohortRoute);

app.use("/api/students", isAuthenticated, studentRoute);

app.use("/api/auth", authRouter);

app.use("/api/users", isAuthenticated, userRoute);
//ERROR HANDLING MIDDLEWARES
app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});