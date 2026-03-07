import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose"
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// const cohorts = require("./cohorts.json")
// const students = require("./students.json");
import studentModel from "./models/student.model.js";
import cohortModel from "./models/cohort.model.js"
import authRoutes from "./routes/auth.routes.js"

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({ origin: ["http://localhost:5173"] }));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", authRoutes)

mongoose.connect('mongodb://localhost:27017/cohort-tools-api').
then(()=>{
  console.log("connected to db")
})
.catch ((err) =>console.log(err))

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/api/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// Cohort Routes

// POST /api/cohorts - Creates a new cohort
app.post("/api/cohorts", async (req, res, next)=> {
  try {
    const getCohorts= await cohortModel.create(req.body)
    res.status(201).json(getCohorts)
  } catch (err) {
    next(err);
  }
}
)

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
app.get("/api/cohorts", async (req, res, next)=>{
  try {
    const cohorts = await cohortModel.find()
    res.status(200).json(cohorts);
  }
  catch (err) {
    next(err);
  }; 
})


// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try{
    const cohort = await cohortModel.findById(req.params.cohortId)
    if (!cohort) {
      return res.status(404).json({ message: "cohort not found" })
    }
    res.status(200).json(cohort)
  }
  catch (err) {
    next(err);
  }
}
)


// PUT /api/cohorts/:cohortId - Updates a specific cohort by id
app.put("/api/cohorts/:cohortId",async (req,res, next) => {
  try{
    const cohort = await cohortModel.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    res.status(200).json(cohort)
  }
 catch (err) { 
    next(err);
 }
  }) 

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
app.delete("/api/cohorts/:cohortId",async (req, res, next) => {
  try{
    const cohort = await cohortModel.findByIdAndDelete(req.params.cohortId)
    res.status(200).json(cohort)
  }
 catch (err) { 
    next(err)
 }
  }) 


// Student Routes

// POST /api/students - Creates a new student
app.post("/api/students", async (req, res, next)=> {
  try {
    const student = await studentModel.create(req.body)
    res.status(201).json(student)
  } catch (err) {
       next(err)
  }
}
)


// GET /api/students - Retrieves all of the students in the database collection
app.get("/api/students", async (req, res, next) => {
  try {
    const students = await studentModel.find().populate("cohort");
    res.status(200).json(students);
  } catch (err) {
       next(err)
  }
})

// GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort

app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  try{
    const students = await studentModel.find({ cohort: req.params.cohortId }).populate("cohort");
    res.status(200).json(students)
  }
 catch (err) { 
     next(err)

 }
  })
// GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId",async (req, res, next) => {
  try{
    const students = await studentModel.findById(req.params.studentId).populate("cohort");
    res.status(200).json(students)
  }
 catch (err) { 
      next(err)
 }
  }) 

// PUT /api/students/:studentId - Updates a specific student by id
app.put("/api/students/:studentId",async (req, res, next) => {
  try{
    const students = await studentModel.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    res.status(200).json(students)
  }
 catch (err) { 
      next(err) 
 }
  }) 

// DELETE /api/students/:studentId - Deletes a specific student by id
app.delete("/api/students/:studentId", async (req,res, next) => {
  try{
    const students = await studentModel.findByIdAndDelete(req.params.studentId)
    res.status(200).json(students)
  }
 catch (err) { 
   next(err)
 }
  }) 

app.use((req, res, next) => {                                          
res.status(404).json({ message: "This route does not exist" });      
});                                                                    


app.use((err, req, res, next) => {                                     
  console.error("Error:", err.name, "-", err.message);                 
 
  if (err.name === "CastError") {                                      
    return res.status(400).json({ message: "Invalid ID format" });     
  }                                                                    

  if (err.name === "ValidationError") {                                
    return res.status(400).json({ message: err.message });             
  }                                                                    
 
  res.status(500).json({ message: "Internal server error" });          
});              




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});