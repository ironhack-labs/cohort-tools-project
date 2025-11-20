const Cohort = require("../models/Cohort.model")
const express = require("express")
const router = express.Router()

// Gets all cohorts: 

router.get("/", (req, res) => {
  Cohort.find(req.query)
    .then((cohorts) => {
      console.log("Retrieved cohorts: ", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "failed to retreive cohorts" });
    });
});

// Creates a new cohort:

router.post("/", (req, res) => {
  console.log("received request: ");
  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
    .then(() => {
      res.send("Cohort created sucessfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

// Get a spesific cohort by id:

router.get("/:cohortId", (req, res) => {
  console.log("get request recieved (single cohort)")

  Cohort.find({ _id: req.params.cohortId })
    .then((cohort) => {
      res.json(cohort)
    })
    .catch((error) => {
      console.log(error)
    })

})

router.get("/cohort/:cohortId", (req, res) => {
  console.log(req.params.cohortId);
  Student.find({ cohort: req.params.cohortId })
    .then((students) => {
      console.log(students);
      res.json(students);
    })
    .catch((error) => {
      console.log(error);
    });
});

// update spesific cohort by id:

router.put("/:cohortId", (req, res) => {
  console.log("update req received")

  Cohort.findByIdAndUpdate(req.params.cohortId, {
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
    .then(() => {
      res.send(`cohort with id: ${req.params.cohortId} has updated`)
    })
    .catch((error) => {
      console.log(error)
    })
})

// delete spesific cohort by id:
router.delete("/:cohortId", (req, res) => {
  console.log("delete request received")

  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.send(`the cohort (id: ${req.params.cohortId}) has deleted succesfully`)
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router