const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const Student = require('./Students.model');

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
  totalHours: Number,
  student: {type: Schema.Types.ObjectId, ref: "Students"},
});

const Cohort = mongoose.model("Cohorts", cohortsSchema);

module.exports = Cohort