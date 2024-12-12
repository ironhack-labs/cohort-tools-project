const logger = require('morgan')
const cors = require('cors')
const express = require('express')

module.exports = app => {

    app.use(logger('dev'))
    app.use(express.json())
    app.use(cors({
        origin: ['http://localhost:5173']
    }))

}