const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    projects:[String],
    cohort: {
        type: Schema.Types.ObjectId,
        ref:'Cohorts'


    }
});

const Students = mongoose.model('Students', studentsSchema);

module.exports = Students;