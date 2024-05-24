const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  linkedinUrl: {
    type: String
  },
  languages: {
    type: String,
    enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]
  },
  program: {
    type: String
  },
  background: {
    type: String
  },
  image: {
    type: String,
    default: 'https://i.imgur.com/r8bo8u7.png'
  },
  projects: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]
  },
  cohort: {
    type: Schema.ObjectId,
    ref: 'Cohort'
  }
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student