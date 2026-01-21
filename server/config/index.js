const express = require("express");

const logger = require("morgan");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

module.exports = (app) => {
  app.set("trust proxy", 1); // trust first proxy

  app.use(
    cors({
      origin: [FRONTEND_URL],
      // methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow cookies to be sent
    })
  );

  app.use(logger("dev"));

  app.use(express.json());

  app.use(express.static("public"));

  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());
};
