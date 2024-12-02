const mongoose = require('mongoose')

//SCHEMA
const cohortSchema = mongoose.Schema({
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: String,
    endDate: String,
    programManager: String,
    leadTeacher: String,
    totalHours: Number,
})

//MODEL
const Cohort = mongoose.model('cohort', cohortSchema)

module.exports = Cohort