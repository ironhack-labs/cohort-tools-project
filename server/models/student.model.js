const mongoose = require('mongoose')

//SCHEMA
const studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    projects: Array,
    cohort: {
        type: mongoose.Types.ObjectId,
        ref: "cohort"
    }
})

//MODEL
const Student = mongoose.model('student', studentSchema)

module.exports = Student