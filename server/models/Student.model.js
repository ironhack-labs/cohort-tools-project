const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  linkedinUrl: { type: String, default: "" },
  languages: {
    type: [String],
    enum: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Dutch",
      "Other",
    ],
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: { type: String, default: "" },
  image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
  projects: [],
});

const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;
