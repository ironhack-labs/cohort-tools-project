const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true ,required: true},
    phone: {type: String, required: true},
    linkedinUrl: {type: String, default: ""},
    languages: {type: [String], enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]},
    program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    background: {type: String, default: ""},
    image: {type: String, default: "https://i.imgur.com/r8bo8u7.png"},
    // cohort: Schema.ObjectId,
    cohort: {
        type: Schema.Types.ObjectId,
        ref: "Cohort" // "Cohort" is the model to which we are creating a reference relationship
    },
    projects: Array
})

const Student = mongoose.model("Student", studentSchema);
 
module.exports = Student;