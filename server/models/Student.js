const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  linkedinUrl: { type: String },
  languages: [{ type: String }],
  program: { type: String },
  background: { type: String },
  image: { type: String },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort', required: true },
  projects: [{ type: String }]
});

module.exports = mongoose.model('Student', StudentSchema);
