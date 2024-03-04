const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents

const cohortSchema = new Schema({
  cohortSlug: { type: String, required: true },
  cohortName: { type: String, required: true },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
  format: { type: String, enum: ["Full Time", "Part Time"] },
  campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"] },
  startDate: {type: Date, default: Date.now},
  endDate: Date,
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 360 },
});

// CREATE MODEL

const Cohort = mongoose.model("Cohort", cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;
