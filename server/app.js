const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Cohorts = require(__dirname + "/cohorts.json")
const Students = require(__dirname + "/students.json")
const PORT = 5005;
const mongoose = require("mongoose");
const Student = require("./models/Students.js")
const Cohort = require("./models/Cohorts.js")
const {errorHandler, notFoundHandler} = require('./middleware/error-handling.js')

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(cors());
 app.use(express.urlencoded())
app.use(express.json());


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//..............................................Student REQUESTS..............................................

//Returns all the students in JSON format
app.get("/api/students", async (req, res, next)=>{
  try{
    const response = await Student.find({}).populate("cohort");
    res.status(200).json(response)
  }
  catch(err){
    res.status(500).send({ err: "Failed to retrieve students" });
  
  }
})
//Returns all the students of a specified cohort in JSON format
app.get("/api/students/cohort/:cohortId", async (req, res, next)=>{
  try{
    const response = await Student.find({cohort: req.params.cohortId}).populate("cohort");
    res.status(200).json(response)
  }
  catch(err){
    res.status(500).send({ err: "Failed to retrieve students of this cohort" });
    next(err)
  }
})
//Returns the specified student by id
app.get("/api/students/:studentId", async (req, res, next)=>{
  try{
    const response = await Student.findById(req.params.studentId).populate("cohort");
    res.status(200).json(response)
  }
  catch(err){
    return next(err)
    res.status(500).send({ err: "Failed to retrieve student" });
  }
})
//Creates a new student with their respective cohort id
app.post("/api/students", async (req, res)=>{
  try{
    const response = await Student.create(req.body);
    res.status(200).json(response)
  }
  catch(err){
    res.status(500).send({ err: "Failed to add new student" });
  }
})
//Updates the specified student by id
app.put("/api/students/:studentId", async (req, res)=>{
  try{
    const response = await Student.findByIdAndUpdate(req.params.studentId, req.body, {new:true})
    res.status(200).json(response)
  }
  catch(error){
    res.status(500).send({ err: "Failed to edit student" });
  }
})
//Deletes a specific student by id
app.delete("/api/students/:studentId", async (req, res)=>{
  try{
    await Student.findByIdAndDelete(req.params.studentId);
    res.status(200)
  }
  catch(err){
    next(err);
    res.status(500).send({ err: "Failed to remove student" });
  }
})


//..............................................COHORT REQUESTS..............................................

//Returns all the cohorts in JSON format
app.get("/api/cohorts", async (req, res)=>{
  try{
    const response = await Cohort.find({});
    res.status(200).json(response)
  }
  catch(err){

    res.status(500).send({ err: "Failed to retrieve cohorts" });
  }
})

//Returns the specified cohort by id
app.get("/api/cohorts/:cohortId", async (req, res)=>{
  try{
    const response = await Cohort.findById(req.params.cohortId);
    res.status(200).json(response)
  }
  catch(err){
    res.status(500).send({ err: "Failed to retrieve cohort" });
  }
})

//	Creates a new cohort
app.post("/api/cohorts", async (req, res)=>{
  try{
    const response = await Cohort.create(req.body);
    res.status(200).json(response);
  }
  catch(err){
    res.status(500).send({ err: "Failed to add cohort" });
  }
})

//Updates the specified cohort by id
app.put("/api/cohorts/:cohortId", async (req, res)=>{
  try{
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {new: true})
    res.status(200).json(response)
  }
  catch(err){
    res.status(500).send({ err: "Failed to edit cohort" });
  }
})
//Deletes the specified cohort by id
app.delete("/api/cohorts/:cohortId", async (req, res)=>{
  try{
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.status(200)
  }
  catch(err){
    res.status(500).send({ err: "Failed to delete cohort" });
  }
})

//..............................................CONNECT TO DB..............................................

async function connectMongo(){
  try{
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
    console.log("Connected to Mongo!\nDatabase name: " + connection.connections[0].name);
  }
  catch(err){
    console.error("Error connecting to mongo", err)
  }
}
connectMongo()


app.use(errorHandler)
app.use(notFoundHandler)


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


