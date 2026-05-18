const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema({
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Cohort", cohortSchema);