// ! modules
const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema({
  cohortSlug: {
    type: String,
    required: true,
  },
  cohortName: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: {
    type: String,
    enum: ["Full time", "Part Time"],
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
  },
  startDate: {
    type: Date,
    default: () => new Date(),
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

module.exports = mongoose.model("cohort", cohortSchema);
