//const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

const { Schema, model } = require("mongoose");

// create Schema

// describe structure of the document
const cohortSchema = new Schema({
  id: Schema.Types.ObjectId,
  inProgress: {
    type: Boolean,
    default: false,
  },
  cohortSlug: { type: String, required: true },
  cohortName: { type: String, required: true },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  campus: {
    type: String,
    enum: [
      "Paris",
      "Barcelona",
      "Lisbon",
      "Madrid",
      "Amsterdam",
      "Remote",
      "Berlin",
      "Miami",
    ],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  programManager: {
    type: String,
    required: true,
  },
  leadTeacher: {
    type: String,
    ninLength: 5,
    required: true,
  },
  totalHours: {
    type: Number,
    default: 360,
  },
});

// create the model
const Cohort = model("Cohort", cohortSchema);

// Export the student model
module.exports = Cohort;
