const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// Middleware configuration | Enables Express to trust reverse proxies (e.g., when deployed behind services like Heroku or Vercel)
function config(app) {
  app.set("trust proxy", 1);

  // CORS to allow requests only from the specified origin
  app.use(
    cors({
      origin: [process.env.ORIGIN],
    }),
  );

  // Logs requests in the development environment
  app.use(logger("dev"));

  // Parses incoming JSON requests
  app.use(express.json());

  // Parses incoming request bodies with URL-encoded data (form submissions)
  app.use(express.urlencoded({ extended: false }));
}

module.exports = config;
