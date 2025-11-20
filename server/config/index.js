const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");

function config (app){

app.use(cors({origin: "http://localhost:5173",}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

}

module.exports = config