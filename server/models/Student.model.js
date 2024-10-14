const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  background: { type: String, default: ""},
  cohort: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"Cohort"},
  email: { type: String, required: true, unique: true},
  firstName: { type: String, required: true },
  image: { type: String, default: "https://i.imgur.com/r8bo8u7.png"},
  languages: { type: [String], enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]},
  lastName: { type: String, required: true},
  linkedinUrl: { type: String, default: ""},
  phone: { type: String, required: true},
  projects:Array,
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},

});


const Student = mongoose.model("Student", studentSchema)


module.exports = Student