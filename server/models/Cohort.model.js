const { Schema, model } = require('mongoose');

const cohortSchema = new Schema(
  {
    cohortSlug:   { type: String, required: true, unique: true, trim: true },
    cohortName:   { type: String, required: true, trim: true },
    program:      { type: String, required: true, enum: ['Web Dev','Data Analytics','UX/UI','Cybersecurity'] },
    campus:       { type: String, required: true },
    startDate:    { type: Date, required: true },
    endDate:      { type: Date, required: true },
    inProgress:   { type: Boolean, default: false },
    programManager: String,
    leadTeacher:    String,
    totalHours:     Number
  },
  { timestamps: true }
);

module.exports = model('Cohort', cohortSchema);
