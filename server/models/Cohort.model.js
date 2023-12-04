const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Model = mongoose.model;

const cohortsSchema = new Schema({
    inProgress: { type: Boolean, default: true },
    cohortSlug: { type: String, required: true },
    cohortName: { type: String, required: true },
    program:{ type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
    startDate: {type: Date, default: Date.now()},
    endDate: Date,
    programManager: { type: String, required: true },
    leadTeacher: { type: String, required: true },
    totalHours: { type: Number, default: 360 },
  })

const Cohort = Model("Cohort", cohortsSchema)

module.exports = Cohort