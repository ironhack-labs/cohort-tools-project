const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  linkedinUrl: { type: String },

  languages: { type: [String] },
  program: { type: String, required: true },
  background: { type: String },
  image: { type: String },

  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" },

  //projects: { type: [mongoose.Schema.Types.ObjectId], ref: "Project" },
});

// CREATE A MODEL
const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;
