const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    linkedinUrl: String,
    languages: String,
    program: {type: String, enum: ["Web Dev", "Data Analytics", "UX/UI"]},
    background: String,
    image: String,
    cohort: {type: Number, min:0, default: 0},
    projects: Array
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;