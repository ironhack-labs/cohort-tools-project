const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/students.model.js");
const Cohort = require("./models/cohort.model.js");
const PORT = 5005;
const { errorHandler, notFoundHandler } = require("./error-handling-middleware-page.js")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));
// conenxion bbd et server lab 15/08/2023

mongoose
.connect("mongodb://localhost:27017/cohort-tools-api")
.then((x) => console.log(`connected to data base "${x.connections[0].name}"`))
.catch((err) => console.error("error connected to mongo db", err));


app.use("/api", require("./routes/index.routes.js"))


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
// app.get("/docs", (req, res) => {
//     res.sendFile(__dirname + "/views/docs.html");
// });

// // GET /api/cohorts - This route should return a JSON response with all the cohorts. Use the data provided in the cohorts.json file. For instructions on using res.json, check Express - res.json.

// app.get("/api/cohorts", (req, res) => {
//     Cohort.find({})
//         .then((cohortModal) => {
//             console.log("Retrienved Cohort", cohortModal);
//             res.json(cohortModal);
//         })
//         .catch((err) => {
//             console.log("error retriving student", err);
//             res.json(err);
//         });
// });

// // app.use("/api", require("./routes/index.routes")) otra forma de hacerlo. 

// // GET /api/students - This route should return a JSON response with all the students. Use the data provided in the students.json file.

// // const students = require("./students.json");

// app.get("/api/students", (req, res) => {
//     Student.find({})
//         .then((studentModal) => {
//             console.log("Retrienved Student", studentModal);
//             res.json(studentModal);
//         })
//         .catch((err) => {
//             console.log("error retriving student", err);
//             res.json(err);
//         });
//     // code here
// });

// app.post("/api/students", (req, res) => {
//     Student.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         phone: req.body.phone,
//         linkedinUrl: req.body.linkedinUrl,
//         languages: req.body.languages,
//         program: req.body.program,
//         background: req.body.background,
//         image: req.body.image,
//         cohort: req.body.cohort,
//     })
//     .then((createdStudent) => {
//         res.status(201).json(createdStudent)
//     })
//     .catch((error) => {
//         res.status(500).json({message: "Error while creating new student"})
//     })
// })


// //GET:  /api/students
// app.get("/api/students", (req, res) => {
//     Student.find()
//         .then((allStudents) => {
//             res.status(200).json(allStudents)
//         })
//         .catch((error) => {
//             res.status(500).json({message:"Error to get all students"})
//         })
// })


// //GET:    /api/students/cohort/:cohortId

// // ASK FLORIAN LATER

// app.get("/api/students/cohort/:cohortId", (req, res) => {
//     const cohortId = req.params.cohortId;

//     Student.find({ cohort: cohortId })
//         .then(students => {
//             res.json(students);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'An error occurred.' });
//         });
// });

// //GET :   /api/students/cohort/:cohortId
// app.get("/api/students/:studentId", (req, res) => {
//     Student.findById(req.params.studentId)
//         .then((student) => {
//             res.status(200).json(student)
//         })
//         .catch((error) => {
//             res.status(500).json({message: "Error"})
//         })
// })

// //PUT :   /api/students/:studentId
// app.put("/api/students/:studentId",(req, res) => {
//     Student.findByIdAndUpdate(req.params.studentId, req.body, {new:true})
//         .then((updatedStudent) => {
//             res.status(200).json(updatedStudent)
//         })
//         .catch((error) => {
//             res.status(500).json({message: "Error while updating a student"})
//         })
// })

// //DELETE:  /api/students/:studentId
// app.delete("/api/students/:studentId", (req, res) => {
//     Student.findByIdAndDelete(req.params.studentId)
//         .then(() =>{
//             res.status(204).send()
//         })
//         .catch((error) => {
//             res.status(500).json({message: "Error while deleting a single student"})
//         })
// })




// //COHORTS ROUTES
// app.post("/api/cohorts", (req, res) => {
//     Cohort.create({
//         inProgress: req.body.inProgress,
//         cohortSlug: req.body.cohortSlug,
//         cohortName: req.body.cohortName,
//         program: req.body.program, 
//         campus: req.body.campus,
//         startDate: req.body.startDate,
//         endDate: req.body.endDate,
//         inProgress: req.body.inProgress,
//         programManager: req.body.programManager, 
//         leadTeacher: req.body.leadTeacher, 
//         totalHours: req.body.totalHours
//     })
//     .then((createdCohort) => {
//         res.status(201).json(createdCohort)
//     })
//     .catch((error) => {
//         res.status(500).json({message: "Error while creating a new cohort"})
//     })
// })

// app.get("/api/cohorts", (req, res) => {
//     Cohort.find()
//         .then((allCohorts) => {
//             res.status(200).json(allCohorts)
//         })
//         .catch((error) => {
//             res.status(500).json({message: "Error while getting all cohorts"})
//         })
// })

// //ASK  GET /api/cohorts/:cohortId 

// app.get("/api/cohorts/:cohortId", (req, res) => {
//     const cohortId = req.params.cohortId;

//     // Assuming your Student schema has a field 'cohortId' to represent the cohort they belong to
//     Cohort.find({ cohortId: cohortId })
//         .then(cohorts => {
//             res.json(cohorts);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'An error occurred.' });
//         });
// });


// //PUT  /api/cohorts/:cohortId
// app.put("/api/cohorts/:cohortId",(req, res) => {
//     Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {new:true})
//         .then((updatedCohorts) => {
//             res.status(200).json(updatedCohorts)
//         })
//         .catch((error) => {
//             res.status(500).json({message: "Error while updating cohort"})
//         })
// })

// //DELETE /api/cohorts/:cohortId
// app.delete("/api/cohorts/:cohortId", (req, res) => {
//     Cohort.findByIdAndDelete(req.params.cohortId)
//         .then(() =>{
//             res.status(204).send()
//         })
//         .catch((error) => {
//             res.status(500).json({message: "Error while deleting a single cohort"})
//         })
// })

app.use(errorHandler)
app.use(notFoundHandler)



// START SERVER
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
