const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cohortsSchema = new Schema({
    inPorgress: Boolean, 
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: Date,
    endDate: Date,
    programManager: String,
    leadTeacher: String,
    totalHours: Number

});

const Cohorts = mongoose.model('Cohorts', cohortsSchema);

module.exports = Cohorts;