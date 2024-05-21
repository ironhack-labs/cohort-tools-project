//
const mongoose = require("mongose");
const Schema = mongoose.Schema;

//Create Schema
// Schema - describes and enforces the structure of the documents
const cohortSchema = new Schema({
  cohortSlug: {
    type: String,
    unique: true,
    required: true,
  },
  cohortName: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },
  startedDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  programManager: {
    type: String,
    required: true,
  },
  leadTeacher: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
  },
});

// CREATE MODEL
// The model() method defines a model (Cohort) and creates a collection (cohort) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Cohort" --> "cohort"
const Cohort = model("Cohort", cohortSchema);

// EXPORT THE MODEL
module.exports = Cohort;
