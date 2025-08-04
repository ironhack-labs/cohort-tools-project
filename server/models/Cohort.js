const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cohortSchema = new Schema({
  cohortSlug: String,
  cohortName: String,
  program: String,
  format: String,
  campus: String,
  startDate: Date,
  endDate: Date,
  inProgress: Boolean,
  programManager: String,
  leadTeacher: String,
  totalHours: Number
});

module.exports = model("Cohort", cohortSchema);