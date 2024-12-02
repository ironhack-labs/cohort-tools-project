require("dotenv").config()

require("./db")

const express = require('express')

const app = express()

require('./config')(app)

require('./routes')(app)

const {errorHandler, notFoundHandler} = require('./middleware/error-handling')

app.use(notFoundHandler)

app.use(errorHandler)

module.exports = app