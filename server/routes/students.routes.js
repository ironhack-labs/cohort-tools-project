const router = require("express").Router();

const Students = require("../models/students.model");

router.post("/students", (req, res, next) => {
  Students.create({ ...req.body })
    .then((students) => res.json(students))
    .catch((error) => {
      next(error);
    });
});

router.get("/students", (req, res, next) => {
  Students.find({})
    .populate("cohort")
    .then((student) => res.json(student))
    .catch((error) => {
      next(error);
    });
});

router.get("/students/cohort/:cohortId", (req, res, next) => {
  Students.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((student) => res.json(student))
    .catch((error) => {
      next(error);
    });
});

router.get("/students/:studentId", (req, res, next) => {
  Students.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => res.json(student))
    .catch((error) => {
      next(error);
    });
});

router.put("/students/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  Students.findByIdAndUpdate(id, req.body, { new: true })
    .then((student) => res.json(student))
    .catch((error) => {
      next(error);
    });
});
router.delete("/students/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  Students.findByIdAndDelete(id).then((student) => res.json(student));
});

module.exports = router;
