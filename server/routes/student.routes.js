const router = require("express").Router();

const Student = require("../models/Student.model.js");

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENT RESOURCE ROUTES
// POST /api/students
router.post("/api/students", (req, res, next) => {

  const newStudent = req.body;

  Student.create(newStudent)
    .then((studentFromDb) => {
      res.status(201).json(studentFromDb)
    })
    .catch((error) => {
      console.log("Error creating a new student in the DB...")
            console.log(error);
            res.status(500).json({ error: "Failed to create a new student" })
    })
})

router.get("/api/students", (req, res, next) => {
  Student.find({})
  .then((studentsFromDb) => {
    res.status(200).json(studentsFromDb)
  })
  .catch((error) => {
    console.log("Error getting all students from the DB...")
    console.log(error);
    res.status(500).json({ error: "Failed to get all students" })
  })
})

router.get("/api/students/:studentId", (req, res, next) => {

  const { studentId } = req.params;

  Student.findById(studentId)
    .populate("Cohort")
    .then((studentFromDb) => {
      res.status(200).json(studentFromDb)
    })
    .catch((error) => {
      console.log("Error getting a student from the DB...")
      console.log(error);
      res.status(500).json({ error: "Failed to get a student" })
    })
})

router.put("/api/students/:studentId", (req, res, next) => {

  const { studentId } = req.params;

  const newStudentDetails = req.body;

  Student.findByIdAndUpdate(studentId, newStudentDetails, { new: true })
    .then((studentFromDb) => {
      res.status(200).json(studentFromDb)
    })
    .catch((error) => {
      console.log("Error updating a student in the DB...")
      console.log(error);
      res.status(500).json({ error: "Failed to update a cohort" })
    })
})

router.delete("/api/students/:studentId", (req, res, next) => {
  
  const { studentId } = req.params;

  Student.findByIdAndDelete(studentId)
    .then((response) => {
      res.status(204).json(response)
    })
    .catch((error) => {
      console.log("Error deleting a student from the database")
      console.log(error)
      res.status(500).json({ error: "Failed to delete a student" })
  })
})





// get all students of a specific cohort only
router.get("/api/students/cohort/:cohortId", (req, res, next) => {

  const { cohortId } = req.params;

  let filter = {};

  if (cohortId !== undefined) {
    filter = { cohort: cohortId }
  }

  Student.find(filter)
    .then((students) => {
      res.json(students)
    })
    .catch((error) => {
      console.log("Failed to get all students from specific cohort from the database")
      console.log(error)
      res.status(500).json({ error: "Failed to get all students from specific cohort" })
    })

})


module.exports = router;