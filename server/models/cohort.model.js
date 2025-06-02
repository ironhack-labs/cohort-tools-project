const mongoose = require("mongoose");
const { Schema } = mongoose;

const cohortSchema = new Schema({
  cohortSlug: {
    type: String,
    required: true,
    unique: true,
  },
  cohortName: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    required: true,
  },
  format: {
    type: String,
    enum: ["Full Time", "Part Time"],
    required: true,
  },
  campus: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  programManager: {
    type: String,
    required: true,
  },
  leadTeacher: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    default: 360,
  },
});

const Cohort = mongoose.model("Cohort", cohortSchema);
module.exports = Cohort;
