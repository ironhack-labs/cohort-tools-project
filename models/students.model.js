const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
firstName: {type: String, required: true},
lastName: {type: String, required: true},
email: {type: String, required: true, unique: true},
phone: {type: Number, required: true},
linkedin: {type: String, required: true, unique: true,
     default: " "},
languages: {type: String, enum: ["English", "Spanish", 
    "French", "German", "Protugese", "Dutch", "Other"
]},
program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics",
    "Cybersecurity"
]},
background: {type: String, default: ""},
image: {type: String, Default: "https://i.imgur.com/r8bo8u7.png"},
cohort: {type: Object},
projects: {type: Array}
})


const Students = mongoose.model("Students", studentsSchema);

module.exports = Students;