const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const cohortSchema = new Schema({
  inProgress: { type: Boolean, default: false },
  cohortSlug: { type: String },
  cohortName: { type: String, required: true },
  program: { type: String, required: true },
  campus: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now },
});

// CREATE A MODEL
const Cohort = mongoose.model("Cohort", cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;
