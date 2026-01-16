// models/Cohort.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema(
  {
    cohortSlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    cohortName: {
      type: String,
      required: true,
    },

    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
      required: true,
    },

    format: {
      type: String,
      enum: ["Full Time", "Part Time"],
    },

    campus: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
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
      default: 360,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cohort", cohortSchema);