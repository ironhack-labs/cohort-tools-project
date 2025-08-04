const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
  projects: [String],
  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort"
  }
});

module.exports = model("Student", studentSchema);