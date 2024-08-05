const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortSchema = new Schema({
  cohortSlug: { type: String },

  cohortName: { type: String },

  program: {
    type: String,

    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },

  format: { type: String, enum: ["Part Time", "Full Time"] },

  campus: {
    type: String,

    enum: [
      "Barcelona",
      "Berlin",
      "Paris",
      "Miami",
      "Madrid",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },

  startDate: { type: Date, default: Date.now },

  endDate: { type: Date, default: Date.now },

  inProgress: Boolean,

  programManager: { type: String },

  leadTeacher: { type: String },

  totalHours: { type: Number, min: 0, default: 0 },
});

// CREATE MODEL
// The model() method defines a model (Cohort) and creates a collection (cohorts) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Cohort" --> "cohorts"
const Cohort = mongoose.model("Cohort", cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;
