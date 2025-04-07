const Cohort = require("../models/Cohort.model");
const Student = require("../models/Student.model");
const router = require("express").Router();

router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

// POST /api/cohorts - Creates a new cohort
router.post("/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create new cohort" });
    });
});

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((allCohorts) => {
      res.status(200).json(allCohorts);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving all recipes" });
    });
});
// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get("/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((foundCohort) => {
      res.status(200).json(foundCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Troubles finding the Cohort" });
    });
});
router.get("/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.id)
    .then((oneCohort) => {
      res.status(200).json(oneCohort);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving the specific cohort" });
    });
});
// PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put("/cohorts/:cohortId", (req, res) => {
  Cohort.findOneAndReplace(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "updating cohort failed" });
    });
});

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete("/cohorts/:cohortId", (req, res) => {
  Cohort.findOneAndDelete(req.params.cohortId)
    .then((deletedCohort) => {
      res.status(204).json(deletedCohort);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Cohort couldn't be deleted" });
    });
});

//POST /api/students - Creates a new student
router.post("/students", (req, res) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects,
  })

    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      res.status(500).json({ error: "error while creating Student" });
    });
});
//GET /api/students - Retrieves all of the students in the database collection
router.get("/students", (req, res) => {
  Student.find({})
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving all students" });
    });
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a
router.get("/students/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")

    .then((student) => {
      console.log(res.data);
      res.status(201).json(student);
    })
    .catch((error) => {
      res.status(500).json({ error: "Can't retrieve students by cohort Id" });
    });
});
//GET /API/STUDENTS/:STUDENTID
router.get("/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((foundStudent) => {
      console.log("finded user:", foundStudent);
      res.status(200).json(foundStudent);
    })
    .catch((err) =>
      res.status(500).json({ message: "Trouble finding the Student" })
    );
});

//PUT /api/students/:studentId
router.put("/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      res.status(500).json({ error: "Student not updated" });
    });
});

//DELETE/api/student/:studentId

router.delete("/students/:studentId", (req, res) => {
  console.log("student id:", req.params.studentId);
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while deleting a student" });
    });
});

module.exports = router;
