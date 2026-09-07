const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")

function applyConfigs(app) {
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(cookieParser());

  app.use(
    cors({
      origin: [process.env.ORIGIN],
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

module.exports = applyConfigs;