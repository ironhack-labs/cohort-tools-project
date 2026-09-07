// ./models/Book.model.js
const { Schema, model } = require("mongoose");
// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortSchema = new Schema({
  inProgress: { type: Boolean },
  cohortSlug: { type: String },
  cohortName: { type: String },
  program: { type: String },
  campus: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  programManager: { type: String },
  leadTeacher: { type: String },
  totalHours: { type: Number },
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"

// EXPORT THE MODEL
module.exports = model("Cohort", cohortSchema);
