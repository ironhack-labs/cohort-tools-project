const { Schema, model } = require("mongoose");

const cohortSchema = new Schema(
  {
    cohortSlug: {
      type: String,
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
      enum: ["Full Time", "Part Time"],
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
      minLength: 5,
      required: true,
    },
    totalHours: {
      type: Number,
      default: 360,
    },
  },
  {
    timestamps: true,
  }
);

const Cohort = model("Cohort", cohortSchema);

module.exports = Cohort;
