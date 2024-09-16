// Import the library components:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema:
const cohortSchema = new Schema({

  cohortSlug: { type: String, required: true, unique: true },
  cohortName: { type: String, required: true },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
  format: { type: String, enum: ["Full Time", "Part Time"] },
  campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"] },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 360 }
});

// Create a model (assigning our schema to a model):
const Cohort = mongoose.model("Cohort", cohortSchema);


// Export the model:
module.exports = Cohort;




