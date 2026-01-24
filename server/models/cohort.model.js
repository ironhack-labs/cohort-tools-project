const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema(
    {
        cohortSlug:{
            type: String,
            required: true,
            unique: true,
        },
        cohortName:{
            type: String,
            required: true
        },
        program:{
            type: String,
            enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
        },
        format:{
            type: String,
            enum: ["Full Time", "Part Time"],
        },
        campus:{
            type: String,
            enum: [
        "Madrid",
        "Barcelona",
        "Miami",
        "Paris",
        "Berlin",
        "Amsterdam",
        "Lisbon",
        "Remote",
                ],
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
        inProgress: {
            type: Boolean,
            default: false,
        },
        programManager: {
            type: String,
            required: true,
        },
        leadTeacher: {
            type: String,
            required: true,
        },
        totalHours: {
            type: Number,
            default: 360,
        },
    },
    // NEW info called timestamps- doesnt break the API, Mongoose automatically updates
    //Mongoose automatically adds two field to every document
    //{ createdAt: Date, updatedAt: Date}
    { timestamps: true }
)


module.exports = mongoose.model("Cohort", cohortSchema);
