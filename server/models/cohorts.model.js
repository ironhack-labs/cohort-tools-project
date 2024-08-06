const { Schema, model } = require("mongoose");

// Define el esquema para la Cohorte
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
// module.exports = model("Student", studentSchema);

module.exports = model("Cohort", cohortSchema);
