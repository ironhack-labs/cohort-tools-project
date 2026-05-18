const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  program: String,
  background: String,
  image: String,
  cohort:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Cohort"
  }
});

module.exports = mongoose.model("Student", studentSchema);