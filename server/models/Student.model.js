const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
  firstName: { type: String, required: true },

  lastName: { type: String, required: true },

  email: { type: String},

  phone: { type: String },

  linkedinUrl: { type: String},
  
  languages: [{ type: String }],

  program: {
    type: String,
    required: true,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },

  background: { type: String, required: true },

  image: {
    type: String,
    default: "https://i.imgur.com/r8bo8u7.png",
  },

  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],

  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cohort",
  },
});

// CREATE MODEL
// The model() method defines a model (Student) and creates a collection (students) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Student" --> "students"
const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;
