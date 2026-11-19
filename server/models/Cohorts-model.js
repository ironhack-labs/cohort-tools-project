const mongoose = require("mongoose")

const schema = new mongoose.Schema({
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

const Cohorts = mongoose.model("Cohorts", schema)
module.exports = Cohorts 