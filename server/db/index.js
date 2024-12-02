const mongoose = require('mongoose')

const databaseName = 'cohort-tools-api'
const conectionString = `mongodb://localhost/${databaseName}`

mongoose
    .connect(conectionString)
    .then(conectionInfo => console.log(`Connected to Mongo! Database name: "${conectionInfo.connections[0].name}"`))
    .catch(err => console.log('Error connecting to mongo', err))