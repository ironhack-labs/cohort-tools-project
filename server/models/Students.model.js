const mongoose = require("mongoose");
const {Schema} = mongoose;


const studentsSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [],
    program: String,
    background: String,
    image: String,
    projects: [],
    cohort: {type: Schema.Types.ObjectId, ref: 'Cohorts'}
});

const Student = mongoose.model("Students", studentsSchema);

module.exports = Student