// MONGOOSE
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

// SCHEMA
const studentSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    phone: {
        type: String, 
        required: true
    }, //Should be string
    linkedinUrl: {
        type: String, 
        default: ""
    }, //Should be linkedinUrl
    languages: {
        type: [String], 
        enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"] 
    }, //should be array of strings, not string
    program: {
        type: String, 
        enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] 
    },
    background: {
        type: String, 
        default: ""
    }, //Should be default, small d
    image: {
        type: String, 
        default: "https://i.imgur.com/r8bo8u7.png" 
    },
    cohort: {
        type: Schema.Types.Mixed, 
        ref: "Cohort"
    },
    projects: {
        type: Array
    },
},
{
    timestamps: true
})

// CREAT MODEL
const Student = mongoose.model("Student", studentSchema)

// EXPORT THE MODEL
module.exports = Student;