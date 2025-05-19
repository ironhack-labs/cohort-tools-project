const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    linkedinUrl: {
        type: String,
        default: "",
    },
    languages: [{
        type: String,
        enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"],
    }],
    program: {
        type: String,
        enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    background: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "https://i.imgur.com/r8bo8u7.png",
    },
    cohort: {
        type: Schema.Types.ObjectId,
        ref: "Cohort",
    },
    projects: {
        type: [String],  // On suppose que ce sont des titres ou noms de projets, adapte selon besoin
        default: [],
    }
});

module.exports = model("Student", studentSchema);
