const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortsSchema = new Schema({
  _id: Number,
  cohortSlug: String,
  cohortName: String,
  program: String,
  format: String,
  campus: String,
  startDate: String,
  endDate: String,
  inProgress: Boolean,
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
});

const Cohorts = mongoose.model("Cohorts", cohortsSchema);
module.exports = Cohorts;
