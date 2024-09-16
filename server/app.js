require("dotenv").config();

// console.log(process.env.MONGODB_URI)

require("./config/dbConnections.js");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT;
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
// Devs Team - Start working on the routes here:
// ...

// const indexRoutes = require("./routes/index.routes")

app.use("/", require("./routes/index.routes"));

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
