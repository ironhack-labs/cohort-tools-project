const mongosee = require('mongoose')

const cohortSchema = mongosee.Schema({

    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: Date,
    endDate: Date,
    programManager: String,
    leadTeacher: String,
    totalHours: Number
})

const Cohort = mongosee.model('cohort', cohortSchema)

module.exports = Cohort