const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Model = mongoose.model;

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
    projects:  Array,
    cohort: String
  })


//create a model
const Student = Model("Student", studentsSchema)

module.exports = Student