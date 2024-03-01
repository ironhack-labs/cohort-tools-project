const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
//import
const Student = require("./models/Student.model.js");
const Cohort = require("./models/Cohort.model.js")
const app = express(); // INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const { isAuthenticated } = require("./middleware/jwt.middleware");


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


  app.use(
    cors({
      origin: ['http://localhost:5173'], 
    })
  );
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  /* ROUTES */
  const cohortRoutes = require('./routes/cohort.routes');
  app.use('/api', isAuthenticated, cohortRoutes); // '/api' works like a default value that goes before every route path you create inside cohortRoutes.
  
  // So, if you have a '/cohorts' --> the route is going automatically be '/api/cohorts'.

  const studentsRoutes = require('./routes/students.routes');
  app.use('/api', isAuthenticated, studentsRoutes); // '/api' works like a default value that goes before every route path you create inside studentsRoutes.
  
  /* const allRoutes = require("/routes");
  app.use("/api", allRoutes); // ADDED BY STUDENT PORTAL  */

   
  const authRouter = require("./routes/auth.routes");       //  <== IMPORT
  app.use("/auth", authRouter);                             //  <== ADD
   
   

  

/*app.get("/docs", (req, res) => {
res.sendFile(__dirname + "/views/docs.html")
})*/


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;