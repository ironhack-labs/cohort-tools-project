const mongoose = require('mongoose');

const CohortSchema = new mongoose.Schema({
  cohortSlug: { type: String, required: true },
  cohortName: { type: String, required: true },
  program: { type: String, required: true },
  format: { type: String },
  campus: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  inProgress: { type: Boolean, default: false },
  programManager: { type: String },
  leadTeacher: { type: String },
  totalHours: { type: Number }
});

module.exports = mongoose.model('Cohort', CohortSchema);
