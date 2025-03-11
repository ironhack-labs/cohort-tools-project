


const mongoose = require("mongoose");
const Schema = mongoose.Schema;  

const cohortsSchema = new Schema({
    cohortSlug: { type: String },
    cohortName: {type: String},
    program: {type: String},
    format: {typre: String},
    campus: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    inProgress: {type: Boolean},
    programManager: {type: String},
    leadTeacher: {type: String},
    totalHours: {type: Number}
},{
    });

const Cohort = mongoose.model("Cohorts", cohortsSchema);
module.exports = Cohort;

