const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortsSchema = new Schema({
    _id: Number,
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: String,
    endDate: String,
    programManager: String,
    leadTeacher: String,
    totalHours: Number
})

const Cohorts = mongoose.model("Cohorts", cohortsSchema);

module.exports = Cohorts;