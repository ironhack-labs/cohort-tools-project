// ./models/Cohorts.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [{
        type: String,
        enum: ["English", "Dutch", "Spanish", "French", "German", "Portuguese"],
        default: []
    }],
    program: String,
    background: String,
    image: String,
    cohort: String,
    projects: [String]
});


// CREATE MODEL
// The model() method defines a model (Student) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Student" --> students
const Student = mongoose.model("Student", studentSchema);


// EXPORT THE MODEL
module.exports = Student;
