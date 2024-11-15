// ./models/Book.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents



const studentSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.ObjectId,
    default : null,
   },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    default: "",
  },
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
  background: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "https://i.imgur.com/r8bo8u7.png",
  },
  cohort: {
    type: mongoose.Schema.ObjectId, 
    ref: "Cohort"
  },
  projects: {
    type: [String],
  },
});

// CREATE MODELS

const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL

module.exports = Student;
