const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
  projects: [String]
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
