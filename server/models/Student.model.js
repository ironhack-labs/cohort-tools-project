const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
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
  projects: Array,
  cohort: String,
});

// CREATE MODEL
// The model() method defines a model (Cohort) and creates a collection (cohorts) in MongoDB
const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;
