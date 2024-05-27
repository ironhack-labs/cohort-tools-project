require('dotenv').config();

require('./db')

const express = require("express");
const app = express();

const  isAuthenticated  = require('./middleware/jwt')
require('./config')(app);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const studentRoutes = require('./routes/student.routes');
app.use('/api', studentRoutes);

const cohortRoutes = require('./routes/cohort.routes');
app.use('/api', cohortRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const protectedRoutes = require('./routes/protected.routes');
app.use('/auth', isAuthenticated, protectedRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api', isAuthenticated, userRoutes)

require('./error-handling')(app);

module.exports = app;