const express = require("express")
const morgan = require ("morgan")
const cors= require ("cors")
const cookieParser = require("cookie-parser");

function configs (app){

  app.use(cors({
    origin: [process.env.ORIGIN]
  }))
  
  
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

}

module.exports = configs