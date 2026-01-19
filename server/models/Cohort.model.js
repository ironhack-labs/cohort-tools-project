const { Schema, model } = require("mongoose");

const cohortSchema = new Schema({
  cohortSlug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  cohortName: {
    type: String,
    required: true,
    trim: true,
  },

  program: {
    type: String,
    required: true,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },

  format: {
    type: String,
    required: true,
    enum: ["Full Time", "Part Time"],
  },

  campus: {
    type: String,
    required: true,
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
    default: Date.now,
  },

  endDate: {
    type: Date,
    required: true,
  },

  inProgress: {
    type: Boolean,
    default: false,
  },

  programManager: {
    type: String,
    required: true,
    trim: true,
  },

  leadTeacher: {
    type: String,
    required: true,
    trim: true,
  },

  totalHours: {
    type: Number,
    default: 360,
    min: 1,
  },
});
const CohortModel = model("Cohort", cohortSchema);
module.exports = CohortModel;
