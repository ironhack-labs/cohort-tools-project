const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const cohortsSchema = new Schema({
  name: String,
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

const Cohort = mongoose.model("Cohorts", cohortsSchema);

module.exports = Cohort