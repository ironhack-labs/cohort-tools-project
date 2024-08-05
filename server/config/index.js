const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

module.exports = (app) => {
  app.use(express.json());
  app.use(logger("dev"));
  app.set("trust proxy", 1);
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );
};
