const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    default: '',
  },
  languages: {
    type: [{ type: String, enum: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Dutch', 'Other'] }],
    default: [],
  },
  program: {
    type: String,
    required: true,
    enum: ['Web Dev', 'UX/UI', 'Data Analytics', 'Cybersecurity'],
  },
  background: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: 'https://i.imgur.com/r8bo8u7.png',
  },
  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cohort',
  },
  projects: {
    type: [],
  },
});

const Students = mongoose.model('Students', studentsSchema);

module.exports = Students;
