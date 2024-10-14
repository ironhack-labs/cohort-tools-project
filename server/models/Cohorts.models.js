
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortsSchema = new Schema({
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


module.exports = mongoose.model("Cohort", cohortsSchema);
