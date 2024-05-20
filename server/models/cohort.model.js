const { mongoose, Schema } = require("mongoose");

//Create Schema
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
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  campus: {
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
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  inProgress: {
    type: Boolean,
    required: true,
  },
  programManager: {
    type: String,
    required: true,
  },
  leadTeacher: {
    type: String,
    require: true,
  },
  totalHours: {
    type: Number,
  },
});

//Create Model
const Cohort = mongoose.model("Cohort", cohortSchema);

//Export Model
module.exports = Cohort;
