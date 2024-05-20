const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortSchema = new Schema({
  cohortSlug: String,
  cohortName: String,
  program: String,
  format: { type: String, enum: ["Part Time", "Full Time"] },
  campus: String,
  year: Number,
  startDate: Date,
  endDate: Date,
  inProgress: Boolean,
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
});
const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
