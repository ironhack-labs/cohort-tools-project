const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  cohortSlug: { type: String, required: true },
  cohortName: { type: String, required: true },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: { type: String, enum: ["Full Time", "Part Time"] },
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
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 360 },
});

const cohorts = mongoose.model("cohorts", cohortSchema);

// EXPORT THE MODEL
module.exports = cohorts;

/* 
| `cohortSlug`     | *`String`*           | Unique identifier for the cohort. Required. |
| `cohortName`     | *`String`*           | Name of the cohort. Required.              |
| `program`        | *`String`*           | Program/course name. Allowed values: "Web Dev", "UX/UI", "Data Analytics", "Cybersecurity". |
| `format`         | *`String`*           | Format of the cohort. Allowed values: "Full Time", "Part Time". |
| `campus`         | *`String`*           | Campus location. Allowed values: "Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote". |
| `startDate`      | *`Date`*             | Start date of the cohort. Default: Current date. |
| `endDate`        | *`Date`*             | End date of the cohort.                     |
| `inProgress`     | *`Boolean`*          | Indicates if the cohort is currently in progress. Default: false. |
| `programManager` | *`String`*           | Name of the program manager. Required.      |
| `leadTeacher`    | *`String`*           | Name of the lead teacher. Required.         |
| `totalHours`     | *`Number`*           | Total hours of the cohort program. Default: 360. | */
