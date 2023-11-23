const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortsSchema = new Schema ({
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    format: String,
    campus: String,
    startDate: String,
    endDate: String,
    programManager: String,
    leadTeacher: String,
    totalHours: Number,
    
    
})

const Cohort = mongoose.model("Cohort", cohortsSchema);
module.exports = Cohort;