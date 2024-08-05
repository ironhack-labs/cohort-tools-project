const app = require("express").Router();
const Student = require("../models/students.model");
const Cohort = require("../models/cohorts.model");

app.get("/", (req, res) => {
  Student.find()
    .populate("cohort")
    .then((students) => res.json(students))
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while retrieving students.");
    });
});
app.post("/", (req, res) => {
  Student.create({ ...req.body })
    .then((student) => res.json(student))
    .catch((err) => console.error(err));
});
app.get("/cohort/:cohortId", (req, res) => {
  Student.findById(req.params.cohortId)
    .populate("cohort")
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});
app.get("/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => res.json(student))
    .catch((err) => console.error(err));
});
app.put("/:studentId", (req, res) => {
  console.log(req.body);
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .populate("cohort")
    .then((student) => res.json(student))
    .catch((err) => console.error(err));
});
app.delete("/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => res.json({ message: "Student deleted successfully" }))
    .catch((err) => console.error(err));
});

module.exports = app;
