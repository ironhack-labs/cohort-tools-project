const mongoose = require("mongoose");
const { isBooleanObject } = require("util/types");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Cohort" --> "cohorts"
const Cohort = mongoose.model("Cohort", cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;
