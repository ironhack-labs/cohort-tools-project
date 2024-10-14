const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  campus:{ type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
  cohortName: { type: String, required: true},
  cohortSlug: { type: String, required: true, unique: true},
  endDate: Date,
  format: { type: String, enum: ["Full Time", "Part Time"]},
  inProgress: { type: Boolean, default: false},
  leadTeacher: { type: String, required: true},
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  programManager: { type: String, required: true},
  startDate: { type: Date, default: Date.now},
  totalHours: { type: Number, default: 360}

});


const Cohort = mongoose.model("Cohort", cohortSchema)


module.exports = Cohort