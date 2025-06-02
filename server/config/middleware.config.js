// config/middleware.js

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

function middlewareConfig(app) {
  // Allow frontend from Vite port
  app.use(
    cors({
      origin: "http://localhost:5174", // your React frontend port
      credentials: true, // needed if you're sending cookies or Authorization headers
    })
  );

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}

module.exports = middlewareConfig;
