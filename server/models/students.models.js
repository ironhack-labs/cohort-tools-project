const mongoose = require("mongoose");
const Schema= mongoose.Schema;  

const studentsSchema = new Schema({
    
    firstName: {type: String, reqired:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    phone: {type: String, required:true},
    linkedinUrl: {type: String, required:true},
    languages: {type: [String], default: []},
    program: {type: String},
    background: {type: String},
    image: {type: String},
    cohort: {type: Schema.Types.ObjectId,
        ref: 'Cohorts'
    },
    projects: {type: [String]}
},{
    });

const Student = mongoose.model("Students", studentsSchema);
module.exports = Student;

