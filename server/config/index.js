function configs(app){

  const express = require("express");
  const cors = require("cors");
  const morgan = require("morgan");
  const cookieParser = require("cookie-parser");

  app.use(express.json());
  app.use(
    cors({
      // Add the URLs of allowed origins to this array
      origin: ['http://localhost:5173'],
    })
  );

  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
}

module.exports = configs