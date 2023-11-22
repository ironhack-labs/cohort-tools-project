const mongoose = require("mongoose");
const Schema = mongoose.Schema;


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
    cohort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cohort' 
    },
    projects: Array
});

const Student = mongoose.model("Students", studentsSchema);

module.exports = Student