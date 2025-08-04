const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: { type: Date, default: Date.now },
  endDate:{ type: Date, default: Date.now },
  programManager: String,
  leadTeacher: String, 
  totalHours: Number
});

const Cohort = mongoose.model("Cohort", cohortSchema);


module.exports = Cohort;
