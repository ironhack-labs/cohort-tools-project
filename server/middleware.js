const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const configureMiddleware = (app) => {
    app.use(cors({
        origin: [process.env.CLIENT_URL]
    }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
};

module.exports = configureMiddleware;