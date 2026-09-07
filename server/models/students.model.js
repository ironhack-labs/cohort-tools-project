const { Schema, model } = require("mongoose");
// CREATE STUDENT SCHEMA
const studentSchema = new Schema(
  {

  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  phone: {type: String},
  linkedinUrl: {type: String},
  languages: [
    {type: String},
    {type: String}
  ],
  program: {type: String},
  background: {type: String},
  image: {type: String,
    default: 'images/default-avatar.png'},
  projects: [],
  cohort: {
  type: Schema.Types.ObjectId, ref: "Cohort"
  }
  })



module.exports = model("Student", studentSchema);
