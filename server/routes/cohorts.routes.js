const app = require("express").Router();
const Student = require("../models/students.model");
const Cohort = require("../models/cohorts.model");
app.post("/", (req, res) => {
  const newCohort = Cohort.create({ ...req.body })
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});

app.get("/", (req, res) => {
  Cohort.find({})
    .then((cohorts) => res.json(cohorts))
    .catch((err) => console.error(err));
});
app.get("/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.json(cohort);
      console.log(cohort);
    })
    .catch((err) => console.error(err));
});
app.put("/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body)
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});
app.delete("/:cohortId", (req, res) => {
  Cohort.findByIdAndRemove(req.params.cohortId)
    .then(() => res.json({ message: "Cohort deleted successfully" }))
    .catch((err) => console.error(err));
});

module.exports = app;
