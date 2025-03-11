const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;


require("./db");



const Cohort = require("./models/cohorts.models.js");
const Student = require("./models/students.models.js");


const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authRoute = require('./routes/auth.route.js');
const studentRoute = require('./routes/students.route.js');
const cohortRoute = require('./routes/cohorts.route.js');
const userRoute = require('./routes/users.route.js');

app.use('/auth', authRoute);
app.use('/api/students', studentRoute); 
app.use('/api/cohorts', cohortRoute);
app.use('/api/users', userRoute);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
