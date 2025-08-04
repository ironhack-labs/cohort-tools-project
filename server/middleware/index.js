const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = [
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  cors(),
  morgan("dev"),
  express.static("public"),
];