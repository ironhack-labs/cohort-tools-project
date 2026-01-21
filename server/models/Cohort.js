const { Schema, model } = require("mongoose");

const cohortSchema = new Schema({
  inProgress: { type: Boolean, default: false },
  cohortSlug: { type: String, required: true, unique: true },
  cohortName: { type: String, required: true },
  program: { type: String, required: true },
  campus: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, required: true },
});

module.exports = model("Cohort", cohortSchema);
