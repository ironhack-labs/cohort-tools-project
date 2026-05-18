const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

function config(app) {
  app.use(
    cors({
      origin: process.env.ORIGIN,
    }),
  );

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}

module.exports = config;
