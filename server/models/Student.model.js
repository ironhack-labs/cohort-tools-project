const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: Array,
  program: String,
  background: String,
  image: String,
  projects: Array,
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
