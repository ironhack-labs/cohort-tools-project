const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

function config(app) {
  // MIDDLEWARE
  // app.use(cors());
  app.use(cors({ origin: [process.env.CLIENT_URL] }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}

module.exports = config;
