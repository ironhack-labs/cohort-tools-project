const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const studentsSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    cohort: ObjectId,
    projects: Array
});

const Student = mongoose.model("students", studentsSchema);

module.exports = Student