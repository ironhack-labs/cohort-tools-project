const mongoose = require('mongoose')


const dataBaseName = 'cohort-tools-api'
const connectionString = `mongodb://localhost/${dataBaseName}`

mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`conected to mongoDB! database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('error connecting to mongo ', err))