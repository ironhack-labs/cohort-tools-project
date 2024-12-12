const express = require('express')
const PORT = 5005
const app = express()

require('./db')

require('./config')(app)

require('./routes')(app)

require('./error-handlers')(app)

app.listen(PORT, () => console.log(`Server running on portn ${PORT}`))