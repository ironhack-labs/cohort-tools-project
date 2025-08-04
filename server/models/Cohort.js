const mongoose = require("mongoose");
const { Schema } = mongoose;

const cohortsSchema = new Schema({
  cohortSlug: { type: String, required: [true, "cohortSlug required"] },
  cohortName: { type: String, required: [true, "cohortName required"] },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: { type: String, enum: ["Full-Time", "Part-Time"] },
  campus: {
    type: String,
    enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"],
  },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: [true, "programManager required"] },
  leadTeacher: { type: String, required: [true, "leadTeacher required"] },
  totalHours: { type: Number, default: 360 },
});

module.exports = mongoose.model("Cohort", cohortsSchema);