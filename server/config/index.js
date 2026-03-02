const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
function config(app) {
  //configurations
  
  app.use(morgan("dev"));

  // static files
  app.use(express.static("public"));
  // MIDDLEWARE
  // Research Team - Set up CORS middleware here:
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
    }),
  );
  /*app.use(cors({
  origin: "*"
}))*/
  // ...
  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));
}

module.exports =config
