const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" }

})
const Student =mongoose.model("Student", studentSchema)
module.exports = Student

