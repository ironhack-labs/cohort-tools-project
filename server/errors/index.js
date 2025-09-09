const express = require("express");

function errorHandler(app) {
  //404 Error Handler
  app.use((req, res) => {
    res.status(404).json({ errorMessage: "Route not found" });
  });
  //500 Error Handler
  app.use((error, req, res, next) => {
    res.status(500).json({ errorMessage: error });
  });
}

module.exports = errorHandler;