const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");

// DB connection

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP
const app = express();


// SWAGGER CODE

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5005",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// MIDDLEWARE
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// DAY 1 & 2 ROUTES
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Cohort Tools API. Please visit /docs for the API documentation."
  );
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "docs.html"));
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// AUTH ROUTE

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
